import Button from '@/components/Button';
import Input from '@/components/Input';
import { LayerT, PreviewItemT, TraitT } from '@/lib/types';
import { useProject } from '@/providers/ProjectProvider';
import PreviewImage from '../steps/preview/PreviewImage';
import SelectTrait from './SelectTrait';
import { useMemo, useState } from 'react';
import InputRules from './InputRules';

type Props = {
  item: PreviewItemT;
  custom?: boolean;
  onDelete?: () => void;
};

const EditPreviewItemModal = ({ item, custom, onDelete }: Props) => {
  const { form, project, layers, customs, deleteCustom, setOriginalProject, resetOriginalProject } = useProject();
  const imageWidth = project.imageWidth || 3000;
  const imageHeight = project.imageHeight || 3000;
  const customIndex = customs.findIndex((c) => c.index === item.index);
  const [quickEditRulesEnabled, setQuickEditRulesEnabled] = useState<{ trait: TraitT; layer: LayerT } | null>(null);

  const quickEditLayerIndex = useMemo(
    () => layers.findIndex((layer) => layer.id === quickEditRulesEnabled?.layer.id),
    [quickEditRulesEnabled?.layer.id, layers]
  );
  const quickEditTraitIndex = useMemo(
    () => layers[quickEditLayerIndex]?.traits.findIndex((trait) => trait.id === quickEditRulesEnabled?.trait.id),
    [quickEditLayerIndex, quickEditRulesEnabled?.trait.id]
  );

  if (!item) return <></>;

  return (
    <div className='relative'>
      <p className='mb-1 text-sm font-medium uppercase text-white/70'>
        Rank {item.ranking}/{project.size} &middot; Rating {item.rating}
      </p>
      <h3 className='mb-4 text-xl font-medium'>
        {project.unitName} #{item.index}
      </h3>

      <div className='grid grid-cols-2 gap-12'>
        <div>
          <div className='relative overflow-hidden rounded-lg bg-gray-700' style={{ paddingBottom: `${(imageWidth / imageHeight) * 100}%` }}>
            <PreviewImage
              key={Object.values(item.traits)
                .filter((trait) => trait.image)
                .map((trait) => `${trait.trait_type}:${trait.value}`)
                .join('|')}
              item={item}
              width={imageWidth}
              height={imageHeight}
            />
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          {custom && <Input type='number' name={`customs[${customIndex}].index`} label='Index' />}

          <div className='grid grid-cols-3 gap-3'>
            {layers.map((layer) => {
              return (
                <div key={`${layer.name}-metadata`} className='flex max-h-[250px] flex-col gap-1 rounded-lg bg-gray-800 p-3'>
                  <div className='flex justify-between'>
                    <p className='text-xs font-medium text-white/50'>{layer.name}</p>
                    {!custom && (
                      <button
                        type='button'
                        className='text-xs text-white/50 transition duration-200 hover:text-white/75'
                        onClick={() => {
                          const trait = layer.traits.find((t) => t.id === item.traits[layer.name].traitId);
                          if (!trait) return;
                          setQuickEditRulesEnabled({ layer, trait });
                        }}
                      >
                        Edit Rules
                      </button>
                    )}
                  </div>
                  {/* <p className='font-medium text-white'>{trait.value}</p> */}
                  {custom ? (
                    <SelectTrait
                      selectedLayer={layer.id}
                      name={`customs[${customIndex}].traits.${layer.name}.traitId`}
                      onChange={(id: string) => {
                        const t = layer?.traits.find((trait) => trait.id === id);
                        if (!t) return;

                        const updatedCustoms = [...customs].map((custom, i) => {
                          if (i !== customIndex) return custom;

                          custom.traits[layer.name] = {
                            layerId: layer.id,
                            traitId: t.id,
                            trait_type: layer.name,
                            value: t.name,
                            image: t.data,
                            excludeFromMetadata: layer.excludeFromMetadata,
                          };

                          return custom;
                        });

                        form.setValue('customs', updatedCustoms);

                        setOriginalProject({
                          ...project,
                          customs: updatedCustoms,
                        });
                      }}
                    />
                  ) : (
                    <SelectTrait
                      selectedLayer={layer.id}
                      name={`previewItems[${item.index - 1}].traits.${layer.name}.traitId`}
                      onChange={(id: string) => {
                        const t = layer?.traits.find((trait) => trait.id === id);
                        if (!t) return;

                        // @ts-ignore
                        form.setValue(`previewItems[${item.index - 1}].traits.${layer.name}`, {
                          layerId: layer.id,
                          traitId: t.id,
                          trait_type: layer.name,
                          value: t.name,
                          image: t.data,
                          excludeFromMetadata: layer.excludeFromMetadata,
                        });

                        resetOriginalProject();
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {!custom && quickEditLayerIndex !== -1 && quickEditTraitIndex !== -1 && (
            <div>
              <h3 className='mb-2 font-medium text-white/50'>Edit {quickEditRulesEnabled?.layer.name} Rules</h3>
              <InputRules name={`layers.${quickEditLayerIndex}.traits.${quickEditTraitIndex}.rules`} />
            </div>
          )}
        </div>
      </div>

      {custom && (
        <div className='mt-48 flex justify-center'>
          <Button
            type='button'
            size='sm'
            color='danger'
            onClick={async () => {
              if (!window.confirm('Are you sure you want to delete this custom?')) return;
              deleteCustom(item.id);
              if (onDelete) onDelete();
            }}
          >
            Delete Custom
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditPreviewItemModal;
