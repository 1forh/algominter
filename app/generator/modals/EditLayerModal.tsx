/* eslint-disable @next/next/no-img-element */
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import InputRow from '@/components/InputRow';
import InputStack from '@/components/InputStack';
import SelectRarityType from '@/components/SelectRarityType';
import { RarityType } from '@/lib/enums';
import { useProject } from '@/providers/ProjectProvider';
import SelectLayer from './SelectLayer';
import { formatNumber } from '@/lib/helpers';
import NftCount from '@/components/NftCount';

type Props = {
  layerId: string;
  onDelete?: () => void;
};

const EditLayerModal = ({ layerId, onDelete }: Props) => {
  const { form, project, layers, deleteLayer, autofillRarity } = useProject();
  const layer = layers.find((l) => l.id === layerId);
  const traits = layer?.traits || [];
  const layerIndex = layers.findIndex((l) => l.id === layerId);
  const excludeFromMetadata = form.watch(`layers.${layerIndex}.excludeFromMetadata`);
  const projectSize = project.size;
  const totalTraits = traits.reduce((total, trait) => {
    switch (trait.rarityType) {
      case 'percent':
        return total + (projectSize * trait.rarity) / 100;
      case 'number':
        return total + trait.rarity;
      default:
        return total;
    }
  }, 0);

  if (!layer || layerIndex === -1) return <></>;

  return (
    <div>
      <p className='mb-1 text-sm font-medium uppercase text-white/70'>Layer</p>
      <h3 className='mb-4 text-xl font-medium leading-6'>{layer.name}</h3>

      <InputStack>
        <Input type='text' name={`layers.${layerIndex}.name`} label='Layer Name' className='w-full' />
        <Checkbox name={`layers.${layerIndex}.excludeFromMetadata`} label='Exclude layer from metadata?' />

        {!excludeFromMetadata && (
          <div className='mb-4 w-full md:w-1/3'>
            <SelectLayer name={`layers.${layerIndex}.sameAs`} label='Override Metadata' />
          </div>
        )}

        <div>
          <div className='flex items-center gap-3'>
            <h2 className='text-xl font-medium'>
              Traits{' '}
              <span className='font-sm text-md'>
                <NftCount count={totalTraits} />
                {/* <button type='button' className='text-sm text-white/50' onClick={() => autofillRarity(layerIndex)}>
                  Autofill rarity
                </button> */}
              </span>
            </h2>
          </div>

          <div className='flex flex-col gap-3'>
            {traits.map((trait, index) => {
              const rarityType = form.watch(`layers.${layerIndex}.traits.${index}.rarityType`);
              const traitRarityAsCount = trait.rarityType === RarityType.PERCENT ? (trait.rarity / 100) * project.size : trait.rarity;

              return (
                <div key={index} className='pt-3'>
                  <div className='flex items-center gap-4'>
                    {trait.data && (
                      <div className='w-16 overflow-hidden rounded-lg bg-gray-700'>
                        <img src={URL.createObjectURL(trait.data)} alt={trait.name} />
                      </div>
                    )}
                    <div className=''>
                      <InputRow>
                        <div className='w-full'>
                          <Input type='text' name={`layers.${layerIndex}.traits.${index}.name`} label='Trait Name' />
                        </div>
                        <div className='w-full'>
                          <Input
                            type='number'
                            name={`layers.${layerIndex}.traits.${index}.rarity`}
                            label='Rarity'
                            suffix={rarityType === RarityType.PERCENT ? '%' : 'NFTs'}
                          />
                        </div>
                        <div className='w-full'>
                          <SelectRarityType name={`layers.${layerIndex}.traits.${index}.rarityType`} label='Rarity Type' />
                        </div>
                        <div className='flex items-end pb-2'>
                          <p className='whitespace-nowrap'>
                            <NftCount count={traitRarityAsCount} />
                          </p>
                        </div>
                      </InputRow>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </InputStack>

      <div className='mt-24 flex justify-center'>
        <Button
          type='button'
          size='sm'
          color='danger'
          onClick={() => {
            deleteLayer(layerIndex);
            onDelete && onDelete();
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default EditLayerModal;
