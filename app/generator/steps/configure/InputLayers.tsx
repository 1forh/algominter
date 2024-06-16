import Button from '@/components/Button';
import Input from '@/components/Input';
import SortableList from '@/components/SortableList';
import SortableListItem from '@/components/SortableListItem';
import { cn } from '@/lib/cn';
import { formatNumber } from '@/lib/helpers';
import { LayerT, PreviewItemT, TraitT } from '@/lib/types';
import { useProject } from '@/providers/ProjectProvider';
import { useFieldArray } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import EditLayerModalButton from '../../modals/EditLayerModalButton';
import Icon from '@/components/Icon';
import { useUser } from '@/providers/UserProvider';
import { FREE_PLAN_MAX_LAYERS } from '@/config';
import toast from 'react-hot-toast';

type Props = {};

const InputLayers = (props: Props) => {
  const { isSubscribed } = useUser();
  const { form, layers, project, selectLayer, activeLayerIndex, resetOriginalProject } = useProject();
  const { append } = useFieldArray({
    control: form.control,
    name: 'layers',
  });

  const onAdd = () => {
    if (!isSubscribed && layers.length >= FREE_PLAN_MAX_LAYERS) {
      toast.error(`You have reached the maximum number of layers allowed in the free plan (${FREE_PLAN_MAX_LAYERS}).`);
      return;
    }

    // @ts-ignore
    const layerName = form.getValues(`_layerName`);
    if (layerName) {
      const id = uuid();
      append({ id, name: layerName, traits: [], excludeFromMetadata: false });
      // @ts-ignore
      form.setValue(`_layerName`, '');
      selectLayer(id);
      resetOriginalProject();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      onAdd();
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      // @ts-ignore
      const oldIndex = layers.findIndex((layer: LayerT) => layer.id === active.id);
      // @ts-ignore
      const newIndex = layers.findIndex((layer: LayerT) => layer.id === over.id);
      const newLayers = [...layers];
      newLayers.splice(newIndex, 0, newLayers.splice(oldIndex, 1)[0]);
      form.setValue('layers', newLayers);

      const layerId = newLayers[newIndex].id;
      selectLayer(layerId);
      resetOriginalProject();
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='relative'>
        <Input type='text' name={`_layerName`} placeholder='Layer Name' className='w-full pr-16' onKeyPress={handleKeyPress} />
        <div className='absolute bottom-0 right-0 top-0 flex items-center p-2'>
          <Button size='sm' onClick={onAdd}>
            Add
          </Button>
        </div>
      </div>

      <SortableList ids={layers.map((layer: LayerT) => layer.id)} onDragEnd={handleDragEnd}>
        {layers
          // @ts-ignore
          .filter((field) => field.id)
          .map((field: any, index: number) => {
            const projectSize = project.size;
            const totalTraits = field.traits.reduce((total: number, trait: TraitT) => {
              switch (trait.rarityType) {
                case 'percent':
                  return total + (projectSize * trait.rarity) / 100;
                case 'number':
                  return total + trait.rarity;
                default:
                  return total;
              }
            }, 0);
            const hasTraitsWithZeroRarity = (field.traits || []).some((trait: any) => trait.rarity === 0 && !trait.excludeTraitFromRandomGenerations);

            return (
              <SortableListItem
                key={field.id}
                id={field.id}
                className={cn('rounded-lg bg-gray-800 p-2', activeLayerIndex === index && 'ring-2 ring-primary-500')}
              >
                <div role='button' className={cn('flex w-full justify-between text-left')} onClick={() => selectLayer(field.id)}>
                  <div className='flex w-full justify-between'>
                    <div className='flex flex-grow flex-col gap-1'>
                      {/* @ts-ignore */}
                      <p>{field.name}</p>
                      {/* @ts-ignore */}
                      <p className={cn('text-xs text-white/50')}>
                        {(field.traits || []).length || 0} traits &middot;{' '}
                        <span
                          className={cn({
                            'text-green-500': Math.round(totalTraits) >= projectSize,
                          })}
                        >
                          {formatNumber(Math.round(totalTraits))}/{formatNumber(projectSize)} NFTs
                        </span>
                      </p>
                    </div>
                    <div className='flex flex-col justify-between'>
                      <EditLayerModalButton layerId={field.id} />
                      {hasTraitsWithZeroRarity && (
                        <div>
                          <Icon name='octagonXmark' className='text-red-500' title='Needs rarity' />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SortableListItem>
            );
          })}
      </SortableList>
    </div>
  );
};

export default InputLayers;
