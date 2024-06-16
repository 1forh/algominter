import Button from '@/components/Button';
import Input from '@/components/Input';
import { useProject } from '@/providers/ProjectProvider';
import PreviewGrid from './PreviewGrid';
import PreviewFilters from './PreviewFilters';
import SaveButton from '../SaveButton';

type Props = {};

const Preview = (props: Props) => {
  const { form, activeLayer, generatePreviewItems } = useProject();

  return (
    <div>
      <div className='flex relative gap-8'>
        <div className='w-[250px] flex flex-col gap-6 overflow-scroll hidden-scrollbar flex-shrink-0'>
          <div className='flex flex-col gap-4'>
            <SaveButton label="Save Preview" />
            <Button type='button' color="accent" onClick={generatePreviewItems} className='w-full'>
              Generate
            </Button>
          </div>
          <PreviewFilters />
        </div>

        <PreviewGrid />
      </div>
    </div>
  );
};

export default Preview;
