/* eslint-disable @next/next/no-img-element */
import Icon from '@/components/Icon';
import { RarityType } from '@/lib/enums';
import { formatNumber } from '@/lib/helpers';
import { TraitT } from '@/lib/types';
import { useProject } from '@/providers/ProjectProvider';
import EditFileModalButton from '../../modals/EditFileModalButton';
import Badge from '@/components/Badge';

type Props = {
  trait: TraitT;
};

const TraitPreview = ({ trait }: Props) => {
  const { layers, activeLayer, activeLayerDetails, project } = useProject();
  const totalAlternatives = (trait.alternatives || []).length;

  const traitRarityAsCount = trait.rarityType === RarityType.PERCENT ? (trait.rarity / 100) * project.size : trait.rarity;

  return (
    <div className='relative flex text-left'>
      <div className='flex flex-col'>
        {trait.data && (
          <div className='rounded-t-lg bg-gray-700'>
            <img src={URL.createObjectURL(trait.data)} alt={trait.name} className='rounded-t-lg' />
          </div>
        )}
        <div className='flex items-end justify-between gap-1 rounded-b-lg bg-gray-800 p-2'>
          <div className='w-full'>
            <div className='mb-1.5 flex w-full items-center justify-between gap-2'>
              <p className='text-left text-sm text-white/70'>{trait.name}</p>
              <Badge size='xs' theme='info' className='capitalize'>
                {trait.rarityType}
              </Badge>
            </div>
            <p className='text-xs text-white/50'>
              {trait.rules.length} rules &middot; {formatNumber(Math.round(traitRarityAsCount))}/{formatNumber(project.size)} NFTs
              {totalAlternatives > 0 && <> &middot; {totalAlternatives} alternatives</>}
            </p>
            <p className='text-xs text-white/50'>
              {activeLayerDetails?.traits.find((t) => t.id === trait?.sameAs)?.name}
            </p>
          </div>
          <div className='flex justify-between'>
            {trait.excludeTraitFromRandomGenerations && (
              <div>
                <Icon name='octagonXmark' className='text-yellow-500' title='Not included in metadata' />
              </div>
            )}
            {!trait.excludeTraitFromRandomGenerations && trait.rarity === 0 && (
              <div>
                <Icon name='octagonXmark' className='text-red-500' title='Needs rarity' />
              </div>
            )}
          </div>
        </div>
      </div>
      {activeLayerDetails && (
        <EditFileModalButton trait={trait} layer={activeLayerDetails}>
          <div className='absolute inset-0 h-full w-full' />
          <span className='sr-only'>Edit</span>
        </EditFileModalButton>
      )}
    </div>
  );
};

export default TraitPreview;
