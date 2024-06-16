import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { useProject } from '@/providers/ProjectProvider';
import React from 'react';

type Props = {};

const DownloadBackupButton = (props: Props) => {
  const { downloadBackup } = useProject();

  return (
    <Button color="gray" size="sm" type='button' onClick={downloadBackup}>
      <Icon name="download" className="mr-2" />
      Download Backup
    </Button>
  );
};

export default DownloadBackupButton;
