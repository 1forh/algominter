import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { cn } from '@/lib/cn';
import { useProject } from '@/providers/ProjectProvider';
import React from 'react';

type Props = {
  label?: string;
};

const SaveButton = ({ label }: Props) => {
  const { saveProject, localSaving, dbSaving } = useProject();
  const isSaving = localSaving || dbSaving;

  return (
    <Button className='flex w-full items-center gap-2' onClick={saveProject}>
      <Icon name={isSaving ? 'spinner' : 'save'} className={cn(isSaving && 'animate-spin')} />
      {label ? label : 'Save Changes'}
    </Button>
  );
};

export default SaveButton;
