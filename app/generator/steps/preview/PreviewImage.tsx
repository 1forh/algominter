/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { PreviewItemT } from '@/lib/types';
import { loadImage } from '@/lib/helpers';
import { useUser } from '@/providers/UserProvider';

type Props = {
  item: PreviewItemT;
  width: number;
  height: number;
};

const imageCache = new Map();

const PreviewImage = ({ item, width, height }: Props) => {
  const { isSubscribed } = useUser();
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);

  const drawImage = useCallback(async () => {
    setImage('');
    const traits = Object.values(item.traits)
      .filter((trait) => trait.image)
      .map((trait) => trait.image);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    for (const trait of traits) {
      try {
        const traitImage = await loadImage(trait, imageCache);
        ctx.drawImage(traitImage, 0, 0, width, height);
      } catch (error) {
        console.error('Error loading trait image:', error);
      }
    }

    if (!isSubscribed) {
      const logoImage = await loadImage('/logo.png', imageCache, 'string');
      const logoWidth = 120;
      const logoHeight = 28;
      // bottom right corner
      ctx.drawImage(logoImage, width - logoWidth - 15, height - logoHeight - 15, logoWidth, logoHeight);
    }

    const dataUrl = canvas.toDataURL('image/webp');
    setImage(dataUrl);
    setLoading(false);
  }, [JSON.stringify(item), width, height]);

  useEffect(() => {
    drawImage();
  }, [drawImage]);

  return (
    <div>
      <div className='absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center bg-gray-800'>
        <Icon name='layerGroup' size='lg' className=' text-white/70' />
        <span className='mt-2 text-lg font-semibold text-white/70'>Click to add traits</span>
      </div>

      {loading && (
        <div className='absolute inset-0 z-20 flex h-full w-full items-center justify-center bg-gray-800'>
          <Icon name='spinner' size='2x' className='animate-spin text-white/70' />
        </div>
      )}

      {image ? (
        <img className='absolute inset-0 z-30 h-full w-full rounded-t-lg' src={image} alt={'preview'} loading='lazy' decoding='async' />
      ) : (
        Object.values(item.traits)
          .filter((trait) => trait.image)
          .map((trait, index) => (
            <img
              key={index}
              className='absolute inset-0 z-30 h-full w-full rounded-t-lg'
              src={URL.createObjectURL(trait.image)}
              alt={trait.value}
              loading='lazy'
              decoding='async'
            />
          ))
      )}
    </div>
  );
};

export default PreviewImage;
