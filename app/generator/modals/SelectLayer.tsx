import { LayerT } from '@/lib/types';
import { useProject } from '@/providers/ProjectProvider';
import Select from 'components/Select';

export default function SelectLayer(props: any) {
  const { form, layers } = useProject();

  const options = layers
    .map((layer: any) => ({
      label: layer.name,
      value: layer.id,
    }))
    .sort((a: any, b: any) => a.label.localeCompare(b.label));

  return (
    <Select
      options={[
        {
          label: 'Please select a layer',
          value: '',
          disabled: true,
        },
        {
          label: 'None',
          value: '',
        },
        ...options,
      ]}
      {...props}
    />
  );
}
