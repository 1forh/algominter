/* eslint-disable @next/next/no-img-element */
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import FileUpload from '@/components/FileUpload';
import Input from '@/components/Input';
import InputRow from '@/components/InputRow';
import InputStack from '@/components/InputStack';
import SelectRarityType from '@/components/SelectRarityType';
import { RarityType } from '@/lib/enums';
import { LayerT, TraitT } from '@/lib/types';
import { useProject } from '@/providers/ProjectProvider';
import InputRules from './InputRules';
import SelectTrait from './SelectTrait';
import { useUser } from '@/providers/UserProvider';

type Props = {
  layer: LayerT;
  trait: TraitT;
  onDelete?: () => void;
};

const EditFileModal = ({ layer, trait, onDelete }: Props) => {
  const { isSubscribed } = useUser();
  const { layers, deleteTrait, form, activeLayerIndex } = useProject();
  const project = form.watch();
  const traitIndex = layer.traits.findIndex((f) => f.id === trait.id);
  const layerIndex = layers.findIndex((f) => f.id === layer.id);
  const sameAs = form.watch(`layers.${activeLayerIndex}.traits.${traitIndex}.sameAs`);
  const imageWidth = project.imageWidth || 3000;
  const imageHeight = project.imageHeight || 3000;
  const rarityType = form.watch(`layers.${activeLayerIndex}.traits.${traitIndex}.rarityType`);
  const traitName = layer.traits.find((trait) => trait.id === sameAs)?.name || trait.name;

  return (
    <div>
      <div className='grid grid-cols-2 gap-12'>
        <div className='flex flex-col gap-5'>
          <div className='relative w-full overflow-hidden rounded-lg bg-gray-700' style={{ paddingBottom: `${(imageWidth / imageHeight) * 100}%` }}>
            <img src={URL.createObjectURL(trait.data)} alt={trait.name} className='absolute inset-0 block h-full w-full' />
          </div>

          {isSubscribed && (
            <div className='flex flex-col'>
              <h3 className='mb-2 text-lg font-bold'>Alternative Images</h3>
              <FileUpload name={`layers.${layerIndex}.traits.${traitIndex}.alternatives`} />
              {(trait.alternatives || []).length > 0 && (
                <div className='mt-5 grid grid-cols-4 gap-4'>
                  {trait.alternatives.map((t, index) => (
                    <div className='rounded-lg bg-gray-700' key={index}>
                      <img src={URL.createObjectURL(t.data)} alt={trait.name} className='rounded-t-lg' />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          <p className='mb-1 text-sm font-medium uppercase text-white/70'>{layer.name}</p>
          <h3 className='mb-4 text-xl font-medium'>{trait.name}</h3>

          <InputStack>
            <div className='w-full'>
              <Input type='text' name={`layers.${layerIndex}.traits.${traitIndex}.name`} label='Trait Name' />
            </div>
            <InputRow>
              <div className='w-full'>
                <Input
                  type='number'
                  name={`layers.${layerIndex}.traits.${traitIndex}.rarity`}
                  label='Rarity'
                  suffix={rarityType === RarityType.PERCENT ? '%' : 'NFTs'}
                />
              </div>
              <div className='w-full'>
                <SelectRarityType name={`layers.${layerIndex}.traits.${traitIndex}.rarityType`} label='Rarity Type' />
              </div>
            </InputRow>
            <Checkbox
              name={`layers.${layerIndex}.traits.${traitIndex}.excludeTraitFromRandomGenerations`}
              label='Exclude trait from random image generations?'
            />
          </InputStack>

          <div className='mt-8'>
            <h4 className='mb-2 text-lg font-medium leading-6'>Trait Rules</h4>
            <InputRules name={`layers.${layerIndex}.traits.${traitIndex}.rules`} />
          </div>

          <div className='mt-8'>
            <h4 className='mb-2 text-lg font-medium'>Metadata</h4>

            <div className='mb-4 w-full md:w-1/2'>
              <SelectTrait selectedLayer={layer.id} name={`layers.${layerIndex}.traits.${traitIndex}.sameAs`} label='Override Metadata' />
            </div>

            <div className='inline-flex rounded-lg bg-gray-800 p-3'>
              <pre>
                <code>{`{
  "trait_type": "${layer.name}",
  "value": "${traitName}"
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-24 flex justify-center'>
        <Button
          type='button'
          size='sm'
          color='danger'
          onClick={() => {
            deleteTrait(layer, trait);
            if (onDelete) onDelete();
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default EditFileModal;
