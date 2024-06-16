import Select from 'components/Select';

export default function SelectRarityType(props: any) {
  const options = [
    { label: 'percent', value: 'percent' },
    { label: 'number', value: 'number' },
  ];

  return <Select options={options} {...props} />;
}
