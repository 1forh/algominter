/* eslint-disable @next/next/no-img-element */
import Icon from '@/components/Icon';
import { formatNumber } from '@/lib/helpers';
import { PreviewItemT } from '@/lib/types';
import { useProject } from '@/providers/ProjectProvider';
import EditPreviewItemModalButton from '../../modals/EditPreviewItemModalButton';
import PreviewImage from './PreviewImage';

type Props = {
  item: PreviewItemT;
  custom?: boolean;
};

const PreviewGridItem = ({ item, custom }: Props) => {
  const { project } = useProject();
  const imageWidth = project.imageWidth || 3000;
  const imageHeight = project.imageHeight || 3000;
  const itemHasAllLayers = project.layers.every((layer) => item.traits[layer.name]?.value);

  return (
    <div className='relative flex h-full w-full flex-col p-2'>
      <div className='relative z-10 overflow-hidden rounded-t-lg bg-gray-700' style={{ paddingBottom: `${(imageWidth / imageHeight) * 100}%` }}>
        <PreviewImage item={item} width={500} height={500} />
      </div>
      <div className='flex flex-col gap-1 rounded-b-lg bg-gray-800 p-2'>
        <div className='flex justify-between items-end gap-1'>
          <div>
            <EditPreviewItemModalButton item={item} custom={custom}>
              <div className='absolute inset-0 z-20 h-full w-full' />
              <span className='sr-only'>Edit</span>
              <p className='text-left text-sm text-white/70'>
                {project.unitName} #{item.index}
              </p>
            </EditPreviewItemModalButton>
            <p className='text-xs text-white/50'>
              Rank {formatNumber(item.ranking)}/{formatNumber(project.size)} &middot; Rating {formatNumber(item.rating)}
            </p>
          </div>
          <div>
            {!itemHasAllLayers && (
              <div>
                <Icon name='octagonXmark' className='text-yellow-500' title='Missing layers' />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewGridItem;
