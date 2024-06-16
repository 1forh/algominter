import Select from 'components/Select';

export default function SelectRuleTypes(props: any) {
  const options = [
    { label: 'force', value: 'force' },
    { label: 'block', value: 'block' },
  ];

  return <Select options={options} {...props} />;
}
