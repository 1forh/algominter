'use client';

import Button from '@/components/Button';
import Icon, { IconName } from '@/components/Icon';

type ErrorMessageActionT = {
  icon: IconName;
  label: string;
  href?: string;
  onClick?: () => void;
};

type Props = {
  eyebrow?: string;
  heading?: string;
  error: string;
  action?: ErrorMessageActionT;
};

export default function ErrorMessage({ error, action, eyebrow, heading }: Props) {
  return (
    <section className='relative mx-auto mt-12 flex h-full max-w-4xl items-center justify-center'>
      <div className='relative flex flex-col items-center justify-center text-center'>
        <p className='text-sm font-medium'>{eyebrow || 'Something went wrong'}</p>
        <p className='mt-2 text-display-sm font-medium tracking-tight'>{heading || 'Sorry, we encountered an error.'}</p>
        <p className='mt-2 text-lg'>Error: {error}</p>

        <div className='mt-8 flex items-center gap-2'>
          {action && (
            <Button href={action.href} onClick={action.onClick} color='gray' className='gap-2'>
              <Icon name={action.icon} />
              {action.label}
            </Button>
          )}
          <Button href='/' color='primary' className='gap-2'>
            <Icon name='home' />
            Go back home
          </Button>
        </div>
      </div>
    </section>
  );
}
