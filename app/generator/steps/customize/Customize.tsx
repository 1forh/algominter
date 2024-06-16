import Button from '@/components/Button';
import { useProject } from '@/providers/ProjectProvider';
import SaveButton from '../SaveButton';
import PreviewGridItem from '../preview/PreviewGridItem';
import Badge from '@/components/Badge';
import Icon from '@/components/Icon';
import { formatNumber } from '@/lib/helpers';

type Props = {};

const Customize = (props: Props) => {
  const { addCustom, customs } = useProject();

  return (
    <div>
      <div className='relative flex gap-8'>
        <div className='hidden-scrollbar flex w-[250px] flex-shrink-0 flex-col gap-4 overflow-scroll'>
          <SaveButton label='Save Customs' />
          <Button type='button' color='outline' onClick={addCustom}>
            Add Custom NFT
          </Button>
        </div>

        <div className='flex flex-col gap-4 w-full'>
          <div>
            <Badge theme='success' className='inline-flex items-center'>
              <Icon name='check' className='mr-2' />
              {formatNumber(customs.length)} total customs
            </Badge>
          </div>
          <div className='grid w-full grid-cols-5 gap-2'>
            {customs.map((custom, index) => (
              <div key={index}>
                <PreviewGridItem key={index} item={custom} custom />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
