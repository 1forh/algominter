'use client';

import { FieldWrapper } from 'components/FieldWrapper';
import { Controller, useFormContext } from 'react-hook-form';

// New type for grouped options
type OptionGroup = {
  groupLabel: string;
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
};

type Props = {
  name: string;
  required?: boolean;
  isMulti?: boolean;
  label?: string;
  isClearable?: boolean;
  options: (OptionGroup | {
    value: string;
    label: string;
    disabled?: boolean;
  })[];
  classNameWrapper?: string;
  info?: string;
  [x: string]: any;
};

export default function Select({
  name,
  label,
  required,
  isMulti,
  options,
  isClearable,
  onChange: customOnChange,
  classNameWrapper,
  info,
  ...props
}: Props) {
  const { control } = useFormContext();
  const { isLoading, ...rest } = props;

  // Function to render options
  const renderOptions = (options: Props['options']) => {
    return options.map((item) => {
      if ('groupLabel' in item) {
        // Rendering grouped options
        return (
          <optgroup key={item.groupLabel} label={item.groupLabel}>
            {item.options.map(option => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </optgroup>
        );
      }
      // Rendering single option
      return (
        <option key={item.value} value={item.value} disabled={item.disabled}>
          {item.label}
        </option>
      );
    });
  };

  return (
    <FieldWrapper name={name} label={label} className={classNameWrapper} required={required} info={info}>
      <Controller
        control={control}
        name={name}
        rules={{ required: required ? 'This field is required' : false }}
        render={({ field: { onChange, value, ref, ...field } }) => {
          const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const newValue = isMulti ? Array.from(event.target.selectedOptions, (option) => option.value) : event.target.value;
            customOnChange?.(newValue);
            onChange(newValue);
          };
          return (
            <select className='input' onChange={onSelect} value={value} multiple={isMulti} ref={ref} {...field} {...rest}>
              {renderOptions(options)}
            </select>
          );
        }}
      />
    </FieldWrapper>
  );
}
