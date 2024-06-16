import Button from '@/components/Button';
import Icon from '@/components/Icon';
import InputRow from '@/components/InputRow';
import SelectRuleTypes from '@/components/SelectRuleType';
import { useProject } from '@/providers/ProjectProvider';
import { useFieldArray } from 'react-hook-form';
import SelectLayer from './SelectLayer';
import SelectTrait from './SelectTrait';

type Props = {
  name: string;
};

const InputRules = ({ name }: Props) => {
  const { form } = useProject();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    // @ts-ignore
    name,
  });

  return (
    <div>
      <div className='flex flex-col gap-2'>
        {fields.map((field, index) => (
          <InputRow key={field.id} className='w-full items-end'>
            <div className='w-full'>
              <SelectRuleTypes name={`${name}.${index}.type`} label='Type' />
            </div>
            <div className='w-full'>
              <SelectLayer name={`${name}.${index}.layer`} label='Layer' />
            </div>
            <div className='w-full'>
              <SelectTrait layerName={`${name}.${index}.layer`} name={`${name}.${index}.trait`} label='Trait' />
            </div>
            <div className='pb-2'>
              <button type='button' onClick={() => remove(index)}>
                <Icon name='delete' className='text-white/70 transition duration-200 hover:text-white' />
                <span className='sr-only'>Remove</span>
              </button>
            </div>
          </InputRow>
        ))}
      </div>

      <InputRow className='mt-4 w-full'>
        {/* @ts-ignore */}
        <Button type='button' size='sm' color='outline' onClick={() => append({ type: 'force', layer: '', trait: '' })}>
          Add Rule
        </Button>
      </InputRow>
    </div>
  );
};

export default InputRules;
