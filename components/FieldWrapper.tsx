import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { cn } from '@/lib/cn';
import Icon from './Icon';
import { Tooltip } from 'react-tooltip';

type Props = {
  name: string;
  label?: string;
  hideLabel?: boolean;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
  help?: string;
  info?: string;
};

export const FieldWrapper = ({ name, label, hideLabel, children, required, help, info, className }: Props) => {
  const { formState } = useFormContext();
  const { errors } = formState;

  if (!label)
    return (
      <div className={cn('relative', className)}>
        <div className='relative flex-grow'>{children}</div>
        {help && <p className='text-sm text-black/60'>{help}</p>}
        <ErrorMessage errors={errors} name={name} render={({ message }) => <span className='text-sm text-red-600'>{message}</span>} />
      </div>
    );
  return (
    <label className={cn('relative flex flex-col gap-1', className)}>
      <span className={cn('input-label flex items-center', hideLabel && 'sr-only')}>
        {label}
        {required && <strong className='font-normal text-red-600 dark:text-red-200'> *</strong>}
        {info && (
          <>
            <div className='ml-2'>
              <a data-tooltip-id={`${name}-info-tooltip`} data-tooltip-content={info}>
                <Icon name='infoCircle' />
              </a>
            </div>
            <Tooltip id={`${name}-info-tooltip`} className='max-w-[300px] !bg-black' />
          </>
        )}
      </span>
      <div className='relative flex-grow'>{children}</div>
      {help && <p className='text-sm text-black/60'>{help}</p>}
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <span className='rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700'>
            <Icon name='exclamationCircle' className='mr-2' />
            {message}
          </span>
        )}
      />
    </label>
  );
};
