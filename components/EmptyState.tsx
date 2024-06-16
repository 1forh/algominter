import React from 'react';
import Button from './Button';

type Props = {
  icon?: string;
  message: string;
  action?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  children?: React.ReactNode;
};

function EmptyState({ icon = 'city', message, action, children }: Props) {
  return (
    <div className='p-12 md:p-16 rounded-lg bg-gray-800 flex flex-col justify-center items-center gap-10 max-w-xl w-full text-gray-400'>
      <div className='flex flex-col items-center justify-center gap-10'>
        <p className='font-medium text-xl text-center'>{message}</p>
      </div>

      {action?.onClick && <Button onClick={action.onClick}>{action.text}</Button>}
      {action?.href && <Button href={action.href}>{action.text}</Button>}
      {children && <div>{children}</div>}
    </div>
  );
}

export default EmptyState;
