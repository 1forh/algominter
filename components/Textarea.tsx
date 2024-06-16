import { FieldWrapper } from '@/components/FieldWrapper';
import { cn } from '@/lib/cn';
import { useFormContext } from 'react-hook-form';

type InputProps = {
  className?: string;
  name: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  large?: boolean;
  [x: string]: any;
};

const Textarea = ({ className, name, required, onChange, label, large, ...props }: InputProps) => {
  const { register } = useFormContext();
  return (
    <FieldWrapper name={name} label={label} required={required}>
      <textarea
        {...register(name, { onChange, required: required ? 'This field is required' : false })}
        className={cn('input w-full', className)}
        {...props}
      />
    </FieldWrapper>
  );
};

export default Textarea;
