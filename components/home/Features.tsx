/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import React from 'react';

type Props = {};

const features = [
  {
    title: 'Configure collection details',
    description: 'Set the name, description, and total supply of your collection.',
  },
  {
    title: 'Add layers and traits',
    description: 'Create unique images by adding layers and traits to your collection.',
  },
  {
    title: 'Set rules and rarity',
    description: 'Define rules for specific traits and set the rarity of each trait.',
  },
  {
    title: 'Preview generated images',
    description: 'Preview images based on the collection size, layers, and traits you have added.',
  },
  {
    title: 'View ranking and metadata',
    description: 'View the ranking of your collection and the metadata of each image.',
  },
  {
    title: 'Download your collection',
    description: 'Download your collection as a zip file and use it to mint NFTs on your favorite blockchain (Algorand).',
  }
];

const Features = (props: Props) => {
  return (
    <div className='py-24 sm:py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl sm:text-center'>
          <p className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-snug'>Everything you need to create the perfect NFT collection</p>
          <p className='mt-6 text-lg leading-8 text-gray-300'>
            AlgoMinter is a powerful tool that allows you to create unique NFT collections. It's easy to use and comes with a lot of
            features that will help you create the perfect NFT collection.
          </p>
        </div>
      </div>
      <div className='relative overflow-hidden pt-16'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <Image
            src='/media/generator-preview.png'
            alt='App screenshot'
            className='mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10'
            width={2432}
            height={1442}
          />
          <div className='relative' aria-hidden='true'>
            <div className='absolute -inset-x-20 bottom-0 bg-gradient-to-t from-gray-900 pt-[7%]'></div>
          </div>
        </div>
      </div>
      <div className='mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8'>
        <dl className='mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16'>
          {features.map((feature, index) => (
            <div key={index} className='relative pl-9'>
              <dt className='inline font-semibold text-white'>
                {/* <svg className='absolute left-1 top-1 h-5 w-5 text-primary-500' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                  <path
                    fill-rule='evenodd'
                    d='M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z'
                    clip-rule='evenodd'
                  />
                </svg> */}
                {feature.title}.{' '}
              </dt>
              <dd className='inline'>{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Features;
