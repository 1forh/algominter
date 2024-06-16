import Dialog from '@/components/Dialog';
import Icon from '@/components/Icon';
import React from 'react';
import EditLayerModal from './EditLayerModal';

type Props = {
  layerId: string;
};

const EditLayerModalButton = ({ layerId }: Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Dialog
        label={
          <>
            <Icon name='cog' />
            <span className='sr-only'>Edit</span>
          </>
        }
        open={open} onOpenChange={setOpen}
      >
        <EditLayerModal layerId={layerId} onDelete={() => setOpen(false)} />
      </Dialog>
    </div>
  );
};

export default EditLayerModalButton;
