import Button from '@/components/Button';
import { useProject } from '@/providers/ProjectProvider';

type Props = {};

const ResetProjectButton = (props: Props) => {
  const { resetProject, layers } = useProject();

  if (layers.length === 0) return <></>;

  return (
    <div className='flex justify-center'>
      <Button color='danger' size="sm" type='button' onClick={resetProject}>
        Reset Project
      </Button>
    </div>
  );
};

export default ResetProjectButton;
