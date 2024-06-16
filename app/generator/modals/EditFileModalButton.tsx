import Dialog from '@/components/Dialog';
import { LayerT, TraitT } from '@/lib/types';
import React from 'react';
import EditFileModal from './EditFileModal';

type Props = {
  trait: TraitT;
  layer: LayerT;
  children: React.ReactNode;
};

const EditFileModalButton = ({ children, trait, layer }: Props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog label={children} maxWidthClass='max-w-[1200px]' open={open} onOpenChange={setOpen}>
      <EditFileModal trait={trait} layer={layer} onDelete={() => setOpen(false)} />
    </Dialog>
  );
};

export default EditFileModalButton;
