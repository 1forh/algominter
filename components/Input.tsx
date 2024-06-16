'use client';
import { newPasswordValidation } from '@/config/form';
import { cn } from '@/lib/cn';
import { FieldWrapper } from 'components/FieldWrapper';
import Icon from 'components/Icon';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

type InputProps = {
  type: string;
  className?: string;
  name: string;
  required?: boolean;
  validateNewPassword?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  help?: string;
  hideError?: boolean;
  disabled?: boolean;
  suffix?: string;
  inputMode?: string;
  [x: string]: any;
};

const Input = ({
  type,
  className,
  name,
  required,
  validateNewPassword,
  onChange,
  label,
  help,
  hideError,
  disabled,
  suffix,
  inputMode,
  ...props
}: InputProps) => {
  const { register } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const passwordClasses = (type === 'password' || (type === 'text' && showPassword)) && 'pr-11';
  const disabledClasses = disabled ? 'bg-gray-200' : '';

  if (type === 'password') {
    type = showPassword ? 'text' : 'password';
  } else {
    type = type || 'text';
  }

  const isNumber = type === 'number' || inputMode === 'numeric';

  return (
    <FieldWrapper {...{ name, label, required, help, hideError }}>
      <input
        {...register(name, {
          onChange,
          required: required ? 'This field is required' : false,
          ...(validateNewPassword && newPasswordValidation),
          setValueAs: (v) => (isNumber ? Number(v) : v),
          ...(isNumber && { typeAsNumber: true }),
        })}
        type={type}
        className={cn('input w-full', passwordClasses, disabledClasses, className)}
        step={isNumber ? 'any' : undefined}
        disabled={disabled}
        {...props}
      />

      {(type === 'password' || (type === 'text' && showPassword)) && (
        <button onClick={() => setShowPassword(!showPassword)} type='button' className='absolute bottom-0 right-4 top-0' title='Toggle show password'>
          {showPassword ? <Icon name='eye' /> : <Icon name='eyeSlash' />}
        </button>
      )}

      {suffix && (
        <div className='absolute bottom-px right-px top-px z-10 flex items-center justify-center rounded-r-md bg-gray-600 text-white px-5'>
          <span>{suffix}</span>
        </div>
      )}
    </FieldWrapper>
  );
};

export default Input;
