import Badge from '@/components/Badge';
import Icon from '@/components/Icon';
import { useProject } from '@/providers/ProjectProvider';
import TraitPreview from './TraitPreview';

type Props = {};

const TraitPreviewGrid = (props: Props) => {
  const { layers, activeLayerIndex, project } = useProject();
  const activeTraits = layers[activeLayerIndex].traits || [];
  const traitsMissingRarity = activeTraits.filter((trait) => trait.excludeTraitFromRandomGenerations !== true).filter((trait) => !trait.rarity);

  return (
    <div>
      <div className='mb-4 flex items-center gap-3'>
        {traitsMissingRarity.length > 0 && <h2 className='text-xl font-medium'>Traits</h2>}
        {traitsMissingRarity.length > 0 && (
          <div>
            <Badge theme='warning' className='inline-flex items-center'>
              <Icon name='warning' className='mr-2' />
              {traitsMissingRarity.length} traits missing rarity
            </Badge>
          </div>
        )}
      </div>
      <div className='grid md:grid-cols-4 xl:grid-cols-5 gap-3'>
        {[...activeTraits].map((trait, index) => (
          <TraitPreview key={index} trait={trait} />
        ))}
      </div>
    </div>
  );
};

export default TraitPreviewGrid;
