'use client';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import toast from 'react-hot-toast';

type FormProps = {
  children: React.ReactNode;
  form: any;
  onSubmit: (callback: any) => void;
  [x: string]: any;
};

export default function Form({ children, form: { handleSubmit, ...form }, onSubmit, ...props }: FormProps) {
  const { errors } = form.formState;

  React.useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.error('Please fix the errors below');
    }
  }, [errors]);

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}
