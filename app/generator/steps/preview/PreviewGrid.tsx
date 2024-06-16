import Badge from '@/components/Badge';
import Icon from '@/components/Icon';
import { formatNumber } from '@/lib/helpers';
import { TraitT } from '@/lib/types';
import { useProject } from '@/providers/ProjectProvider';
import PreviewGridItem from './PreviewGridItem';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

type Props = {};

const PreviewGrid = (props: Props) => {
  const { previewItems, filteredPreviewItems, sortBy, setSortBy, layers, generateIsLoading } = useProject();
  const COLUMN_COUNT = 4;

  const allTraits: { [key: string]: string[] }[] = layers.reduce((acc: any, layer: any) => {
    layer.traits.forEach((trait: TraitT) => {
      if (!acc[layer.name]) {
        acc[layer.name] = [];
      }
      acc[layer.name].push(trait.name);
    });
    return acc;
  }, {});
  const itemStrings = previewItems.map((item) =>
    Object.values(item.traits)
      .map((trait) => trait.value)
      .join(',')
  );
  const uniqueItems = [...new Set(itemStrings)];
  const duplicateItems = itemStrings.length - uniqueItems.length;
  const usedTraits = Object.values(previewItems).reduce((acc: any, item) => {
    Object.values(item.traits).forEach((trait) => {
      if (!acc[trait.trait_type]) {
        acc[trait.trait_type] = [];
      }
      acc[trait.trait_type].push(trait.value);
    });
    return acc;
  }, {});

  const unusedTraitsCount = Object.keys(allTraits).reduce((acc: any, traitType: string) => {
    // @ts-ignore
    const unusedTraits = allTraits[traitType].filter((trait: string) => !usedTraits[traitType]?.includes(trait));
    return acc + unusedTraits.length;
  }, 0);
  const unusedTraits = Object.keys(allTraits).reduce((acc: any, traitType: string) => {
    // @ts-ignore
    const unusedTraits = allTraits[traitType].filter((trait: string) => !usedTraits[traitType]?.includes(trait));
    return acc.concat(unusedTraits);
  }, []);

  const onSort = (e: any) => {
    setSortBy(e.target.value);
  };

  const GridItem = ({ columnIndex, rowIndex, style }: any) => {
    const item = filteredPreviewItems[rowIndex * COLUMN_COUNT + columnIndex];
    return (
      <div style={style}>
        {item && <PreviewGridItem item={item} />}
      </div>
    );
  };

  if (generateIsLoading) {
    return (
      <div className='flex items-center flex-col gap-8 justify-center w-full h-full pt-24 text-white/75'>
        <p className='text-center text-lg'>Please wait while we generate the preview...</p>
        <Icon name='spinner' className='animate-spin w-10 h-10' />
      </div>
    );
  }

  return (
    <div className='relative flex w-full max-h-[90vh] flex-col gap-4'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <Badge theme='success' className='inline-flex items-center'>
            <Icon name='check' className='mr-2' />
            {formatNumber(filteredPreviewItems.length)} total nfts
          </Badge>
          {duplicateItems > 0 && (
            <Badge theme='danger' className='inline-flex items-center'>
              <Icon name='warning' className='mr-2' />
              {formatNumber(duplicateItems)} duplicate nfts
            </Badge>
          )}
          {unusedTraitsCount > 0 && previewItems.length > 0 && (
            <Badge theme='danger' className='inline-flex items-center' title={unusedTraits.join(', ')}>
              <Icon name='warning' className='mr-2' />
              {unusedTraitsCount} unused traits
            </Badge>
          )}
        </div>
        {previewItems.length > 0 && (
          <div className='flex flex-shrink-0 items-center gap-3'>
            <span className='input-label whitespace-nowrap'>Sort by</span>
            <select className='input' onChange={onSort} value={sortBy}>
              <option value='name'>Name</option>
              <option value='rank'>Rank - High to Low</option>
              <option value='rank-reverse'>Rank - Low to High</option>
            </select>
          </div>
        )}
      </div>

      {filteredPreviewItems.length > 0 && (
        <AutoSizer>
          {({ height, width }) => (
            <Grid
              className='grid hidden-scrollbar'
              columnCount={COLUMN_COUNT}
              columnWidth={width / COLUMN_COUNT}
              height={height}
              rowCount={Math.ceil(filteredPreviewItems.length / COLUMN_COUNT)}
              rowHeight={width / COLUMN_COUNT + 60} // 60 is the height of the bottom text
              width={width}
            >
              {GridItem}
            </Grid>
          )}
        </AutoSizer>
      )}
    </div>
  );
};

export default PreviewGrid;
