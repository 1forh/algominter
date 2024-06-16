'use client';

import ErrorMessage from '@/components/ErrorMessage';
import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

type Props = {
  reset: () => void;
  error: Error;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <ErrorMessage
      error={error.message}
      action={{
        icon: 'retry',
        label: 'Refresh',
        onClick: reset,
      }}
    />
  );
}
