import Dialog from '@/components/Dialog';
import { PreviewItemT } from '@/lib/types';
import React from 'react';
import EditPreviewItemModal from './EditPreviewItemModal';

type Props = {
  item: PreviewItemT;
  children: React.ReactNode;
  custom?: boolean;
};

const EditPreviewItemModalButton = ({ children, item, custom }: Props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog label={children} maxWidthClass='max-w-[1200px]' open={open} onOpenChange={setOpen}>
      <EditPreviewItemModal item={item} custom={custom} onDelete={() => setOpen(false)} />
    </Dialog>
  );
};

export default EditPreviewItemModalButton;
