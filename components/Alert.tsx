import { cn } from '@/lib/cn';

type Props = {
  type: 'success' | 'warning' | 'error';
  className?: string;
  children?: React.ReactNode;
};

const Alert = ({ type, className, children }: Props) => {
  const themes = {
    success: 'bg-green-50 border-green-400 text-green-700',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-700',
    error: 'bg-red-50 border-red-400 text-red-700',
  };
  const theme = themes[type];

  return (
    <div className={cn('p-4 overflow-scroll rounded-lg font-medium', theme, className)}>
      {children}
    </div>
  );
};

export default Alert;
