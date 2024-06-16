'use client';

import FileUpload from '@/components/FileUpload';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import InputStack from '@/components/InputStack';
import Textarea from '@/components/Textarea';
import { LayerT } from '@/lib/types';
import { useProject } from '@/providers/ProjectProvider';
import { useUser } from '@/providers/UserProvider';
import EditLayerModalButton from '../../modals/EditLayerModalButton';
import SaveButton from '../SaveButton';
import InputLayers from './InputLayers';
import ResetProjectButton from './ResetProjectButton';
import TraitPreviewGrid from './TraitPreviewGrid';
import { FREE_PLAN_MAX_TRAITS } from '@/config';

type Props = {};

const Configure = (props: Props) => {
  const { isSubscribed } = useUser();
  const { layers, activeLayer, activeLayerDetails, activeLayerIndex } = useProject();
  const hasLayers = layers && layers.length > 0;
  const totalTraits = layers.reduce((acc: number, layer: LayerT) => acc + (layer.traits || []).length, 0);

  return (
    <div>
      <div className='relative flex gap-8'>
        <div className='col-span-2 flex w-[250px] flex-shrink-0 flex-col gap-6'>
          <SaveButton />

          <div className='flex flex-col gap-2'>
            <div>
              <h3 className='text-lg font-medium'>Collection Details</h3>
            </div>
            <InputStack>
              <Input type='text' name='name' placeholder='Collection Name' />
              <Input type='text' name='unitName' placeholder='NFT Unit Name' />
              <Textarea name='description' placeholder='Collection Description' rows={4} />
              <Input type="text" name='website' placeholder='Collection Website' rows={4} />
              <Input type='number' name='size' placeholder='Collection Size' suffix='NFTs' />
              <Input type='number' name='imageWidth' placeholder='Image Width' suffix='px' />
              <Input type='number' name='imageHeight' placeholder='Image Height' suffix='px' />
            </InputStack>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-medium'>
              Layers{' '}
              <span className='text-sm font-normal text-white/70'>
                ({layers.length} layers, {totalTraits} traits)
              </span>
            </h3>
            <div className='flex flex-col gap-6'>
              <InputLayers />
              <ResetProjectButton />
            </div>
          </div>
        </div>

        <div className='w-full'>
          {hasLayers ? (
            <div className='flex flex-col gap-4' key={activeLayer}>
              <div className='flex items-center gap-3'>
                <h2 className='text-display-xs font-bold'>{activeLayerDetails?.name}</h2>
                <EditLayerModalButton layerId={activeLayer} />
              </div>
              <FileUpload disabled={!isSubscribed && layers[activeLayerIndex].traits.length >= FREE_PLAN_MAX_TRAITS} name={`layers[${activeLayerIndex}].traits`} />
              <TraitPreviewGrid />
            </div>
          ) : (
            <div className='mt-12'>
              <div className='text-center'>
                <Icon name="layerPlus" size="2x" className="mx-auto text-white/50" />
                <h3 className='mt-2 text-xl font-semibold text-white'>No layers</h3>
                <p className='mt-1 text-sm text-white/70 max-w-xs mx-auto'>Get started by filling out the details on the left and adding your first layer.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Configure;
