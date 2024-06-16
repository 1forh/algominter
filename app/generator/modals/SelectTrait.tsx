import { useProject } from '@/providers/ProjectProvider';
import Select from 'components/Select';

export default function SelectTrait(props: any) {
  const { form, layers } = useProject();
  const { selectedLayer, layerName, ...rest } = props;
  const _selectedLayer = selectedLayer || form.watch(layerName);
  const traits = layers.find((layer) => layer.id === _selectedLayer)?.traits || [];

  const options = traits
    .map((trait: any) => ({
      label: trait.name,
      value: trait.id,
    }))
    .sort((a: any, b: any) => a.label.localeCompare(b.label));

  return (
    <Select
      options={[
        {
          label: 'Please select a trait',
          value: '',
        },
        ...options,
      ]}

      {...rest}
    />
  );
}
