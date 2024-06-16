import NftCount from '@/components/NftCount';
import { formatNumber } from '@/lib/helpers';
import { useProject } from '@/providers/ProjectProvider';
import React from 'react';

type Props = {};

const PreviewFilters = (props: Props) => {
  const { form, previewItems, filterPreviewItems, layers } = useProject();

  // group all the different traits by trait_type
  const groupedTraits = previewItems.reduce((acc: any, item) => {
    Object.values(item.traits).forEach((trait) => {
      if (!acc[trait.trait_type]) {
        acc[trait.trait_type] = [];
      }

      const traitDetails = layers.find((layer) => layer.id === trait.layerId)?.traits.find((t) => t.id === trait.traitId);

      if (traitDetails?.sameAs) {
        const sameAs = layers.find((layer) => layer.id === trait.layerId)?.traits.find((t) => t.id === traitDetails.sameAs);
        acc[trait.trait_type].push(sameAs?.name);
      } else {
        acc[trait.trait_type].push(trait.value);
      }
    });
    return acc;
  }, {});

  if (!previewItems.length) {
    return null;
  }

  return (
    <div className='hidden-scrollbar h-[85vh] overflow-scroll'>
      <h3 className='text-lg font-medium'>Filters</h3>
      <div className='mt-2 flex flex-col gap-4'>
        {Object.keys(groupedTraits).map((traitType) => {
          const uniqueTraits = [...new Set(groupedTraits[traitType])].sort();

          // get count of each trait and add them together
          const traitCount = uniqueTraits.reduce((acc: any, traitValue: any) => {
            return acc + groupedTraits[traitType].filter((f: any) => f === traitValue).length;
          }, 0) as number;

          return (
            <div key={traitType}>
              <h4 className='font-medium'>
                {traitType} ({uniqueTraits.length})
              </h4>
              <p className='text-sm mt-1'>
                <NftCount count={traitCount} />
              </p>
              <div className='mt-2 flex max-h-[200px] flex-col gap-2 overflow-scroll rounded-lg border border-gray-800 p-4'>
                {uniqueTraits.map((traitValue: any) => (
                  <div key={traitValue} className='rounded-full bg-gray-900 text-sm font-medium text-white'>
                    <label className='flex gap-2 text-white/70'>
                      <input
                        type='checkbox'
                        onChange={(e) => filterPreviewItems(e, traitType, traitValue)}
                        // checked={!!value}
                        className='text-accent-600 focus:ring-accent-500 mt-1 h-4 w-4 rounded border-gray-300'
                        name={`${traitType}-${traitValue}`}
                        value={`${traitType}-${traitValue}`}
                      />{' '}
                      <span className='flex w-full justify-between gap-8'>
                        <span>{traitValue}</span> <span>{formatNumber(groupedTraits[traitType].filter((f: any) => f === traitValue).length)}</span>
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PreviewFilters;
