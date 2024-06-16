import Badge from '@/components/Badge';
import Icon, { IconName } from '@/components/Icon';
import { cn } from '@/lib/cn';
import { useProject } from '@/providers/ProjectProvider';
import React, { useEffect } from 'react';

type Props = {};

const StatusIndicator = (props: Props) => {
  const { localSaving, localSaved, localDataFetched, localError, dbSaving, dbSaved, dbDataFetched, dbError, hasChanges } = useProject();

  const [icon, setIcon] = React.useState<IconName | ''>('spinner');
  const [text, setText] = React.useState('Checking local storage...');
  const [isLoading, setIsLoading] = React.useState(true);
  const isError = localError || dbError;

  useEffect(() => {
    if (localSaving) {
      setIcon('spinner');
      setText('Saving...');
      setIsLoading(true);
    } else if (localError) {
      setIcon('warning');
      setText(localError);
      setIsLoading(false);
    } else if (hasChanges) {
      setIcon('warning');
      setText('Unsaved changes');
      setIsLoading(false);
    } else if (localSaved) {
      setIcon('check');
      setText('Saved changes locally');
      setIsLoading(false);
    } else if (localDataFetched) {
      setIcon('check');
      setText('Local storage is up to date');
      setIsLoading(false);
    }
  }, [localSaving, localSaved, localDataFetched, localError, hasChanges]);

  useEffect(() => {
    if (dbSaving) {
      setIcon('spinner');
      setText('Saving...');
      setIsLoading(true);
    } else if (dbError) {
      setIcon('warning');
      setText(dbError);
      setIsLoading(false);
    } else if (dbSaved) {
      setIcon('check');
      setText('Saved changes to cloud');
      setIsLoading(false);
    } else if (dbDataFetched) {
      setIcon('cloud');
      setText('Cloud is up to date');
      setIsLoading(false);
    }
  }, [dbSaving, dbSaved, dbDataFetched, dbError]);

  return (
    <div>
      <Badge
        theme={isError ? 'danger' : (isLoading || hasChanges) ? 'warning' : localDataFetched ? 'success' : 'default'}
        className='inline-flex items-center gap-2 text-xs'
      >
        {icon && <Icon name={icon} size='sm' className={cn(isLoading && 'animate-spin')} />}
        {text}
      </Badge>
    </div>
  );
};

export default StatusIndicator;
