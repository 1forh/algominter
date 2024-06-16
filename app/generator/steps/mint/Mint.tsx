import Button from '@/components/Button';
import { loadImage } from '@/lib/helpers';
import { PreviewItemT, ProjectT } from '@/lib/types';
import { useProject } from '@/providers/ProjectProvider';
import JSZip from 'jszip';
import React from 'react';
import FileSaver from 'file-saver';
import toast from 'react-hot-toast';
import { useUser } from '@/providers/UserProvider';
import ConnectWalletButton from '@/components/ConnectWalletButton';
import EmptyState from '@/components/EmptyState';

type Props = {};

const Mint = (props: Props) => {
  const { isSubscribed } = useUser();
  const { project, previewItems } = useProject();
  const { imageWidth, imageHeight } = project;
  const [currentMessage, setCurrentMessage] = React.useState('Exporting...'); // Generating high-quality images...
  const [progress, setProgress] = React.useState(0); // 0-100
  const [isMinting, setIsMinting] = React.useState(false);

  const drawImage = async (item: PreviewItemT) => {
    const traits = Object.values(item.traits)
      .filter((trait) => trait.image)
      .map((trait) => trait.image);
    const canvas = document.createElement('canvas');
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Could not get 2d context');
    }

    for (const trait of traits) {
      try {
        const traitImage = await loadImage(trait);
        ctx.drawImage(traitImage, 0, 0, imageWidth, imageHeight);
      } catch (error) {
        console.error('Error loading trait image:', error);
      }
    }

    if (!isSubscribed) {
      const logoImage = await loadImage('/logo.png', undefined, 'string');
      // bottom right corner
      ctx.drawImage(logoImage, canvas.width - 670, canvas.height - 215, 657, 204);
    }

    // convert to blop
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    return blob;
  };

  const formatArc69 = (previewItem: PreviewItemT, _project: ProjectT) => {
    const arc69: { [key: string]: any } = {
      standard: 'arc69',
      description: _project.description,
      mime_type: 'image/png',
    };

    if (_project.website) {
      arc69.external_url = _project.website;
    }

    const properties: { [key: string]: any } = {};

    for (const [traitName, trait] of Object.entries(previewItem.traits)) {
      const sameAs = _project.layers.find((layer) => layer.id === trait.layerId)?.traits.find((t) => t.id === trait.traitId)?.sameAs;
      const sameAsDetails = _project.layers.find((layer) => layer.id === trait.layerId)?.traits.find((t) => t.id === sameAs);
      if (sameAsDetails) {
        properties[traitName] = sameAsDetails.name;
      } else {
        if (trait.value) {
          properties[traitName] = trait.value;
        }
      }
    }

    for (const projectLayer of project.layers) {
      const layerName = projectLayer.name;
      const layerValue = properties[layerName];
      if (!layerValue) {
        toast.error(`Missing layer value for ${layerName} for ${previewItem.index}`);
        throw new Error(`Missing layer value for ${layerName} for ${previewItem.index}`);
      }
    }

    arc69.properties = properties;

    return arc69;
  };

  const onExport = async () => {
    const totalItems = previewItems.length;
    const maxItemsPerZip = 300;
    const totalZips = Math.ceil(totalItems / maxItemsPerZip);

    setIsMinting(true);

    const arc69Data = previewItems.map((item) => formatArc69(item, project));
    const arc69Obj = arc69Data.reduce((acc, item, index) => {
      acc[index + 1] = item;
      return acc;
    }, {} as any);

    console.log({ totalItems, totalZips, maxItemsPerZip, arc69Obj })

    let processedItems = 0;

    try {
      for (let zipIndex = 0; zipIndex < totalZips; zipIndex++) {
        const zip = new JSZip();

        const start = zipIndex * maxItemsPerZip;
        const end = start + maxItemsPerZip;
        const itemsForThisZip = previewItems.slice(start, end);

        for (let i = 0; i < itemsForThisZip.length; i++) {
          const image = await drawImage(itemsForThisZip[i]);

          const progressPercentage = Math.round((processedItems / totalItems) * 100);
          setProgress(progressPercentage);

          zip.file(`${itemsForThisZip[i].index}.png`, image as any, { binary: true });
          processedItems++;
        }

        if (zipIndex === 0) {
          zip.file('arc69.json', JSON.stringify(arc69Obj, null, 2));
        }

        const content = await zip.generateAsync({ type: 'blob' });
        FileSaver.saveAs(content, `${project.name}_${zipIndex + 1}-${totalZips}.zip`);
      }

      toast.success('Export complete!');
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setIsMinting(false);
    }
  };

  // if (!activeAddress) {
  //   return (
  //     <div className='flex justify-center mt-12 md:mt-20'>
  //       <EmptyState message='Connect your wallet and subscribe to download your images.'>
  //         <ConnectWalletButton />
  //       </EmptyState>
  //     </div>
  //   )
  // }

  return (
    <div className='mt-16 flex flex-col gap-16'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <p className='max-w-md text-center text-xl font-medium'>Click the button below to export your images and metadata as a ZIP file.</p>
        <div>
          <Button onClick={onExport}>Export Images</Button>
        </div>
      </div>

      {isMinting && (
        <div className='flex flex-col items-center justify-center gap-6'>
          <p className='text-display-xs font-medium'>{currentMessage}</p>
          <div className='overflow-hidden rounded-lg'>
            <progress
              value={progress}
              max='100'
              className='[&::-moz-progress-bar]:bg-primary-400 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-primary-400'
            ></progress>
            <div className='mt-2 flex items-center justify-center text-lg font-medium text-white'>{progress}%</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mint;
