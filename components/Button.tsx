import { cn } from '@/lib/cn';
import Link from 'next/link';
import Icon from './Icon';

type Props = {
  className?: string;
  color?: string;
  size?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
  children: React.ReactNode;
  href?: string;
  loading?: boolean;
  [x: string]: any;
};

type ColorTypes = {
  [x: string]: string;
};

type SizeTypes = {
  [x: string]: string;
};

export default function Button({ className, disabled, type = 'button', color = 'primary', size = 'md', children, href, loading, ...props }: Props) {
  const baseClasses = 'font-semibold rounded-md inline-flex items-center justify-center transition duration-200';

  const sizes: SizeTypes = {
    '2xl': 'text-lg py-4 px-7',
    xl: 'text-md py-3 px-5',
    lg: 'text-md py-[0.625rem] px-[1.125rem]',
    md: 'text-md py-2 px-4',
    sm: 'text-sm py-1 px-[0.675rem]',
  };

  const colors: ColorTypes = {
    default: 'bg-white text-black border border-gray-300 hover:bg-gray-50 shadow-xs',
    primary: 'bg-primary-500 text-white/90 border hover:bg-primary-500 shadow-xs border-primary-500 hover:border-primary-500',
    accent: 'bg-accent-400 text-white border hover:bg-accent-600 shadow-xs border-accent-400 hover:border-primary-600',
    gray: 'bg-gray-800 text-gray-50 border-gray-900 border hover:border-gray-700 hover:bg-gray-700',
    outline: 'bg-transparent text-white border border-white hover:bg-white hover:text-black/90',
    danger: 'bg-red-50 text-red-700 border border-red-50 hover:border-red-100 hover:bg-red-100',
  };

  const colorClasses = colors[color];
  const sizeClasses = sizes[size];

  return href ? (
    <Link href={href} className={cn(baseClasses, sizeClasses, colorClasses, disabled ? 'opacity-60' : '', className)} {...props}>
      {children}
    </Link>
  ) : (
    <button
      type={type}
      className={cn(baseClasses, sizeClasses, colorClasses, disabled ? 'opacity-60' : '', className)}
      disabled={disabled}
      {...props}
    >
      {loading ? <Icon name='spinner' className='animate-spin' /> : children}
    </button>
  );
}
