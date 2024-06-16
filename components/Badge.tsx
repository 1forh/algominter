import clsx from 'clsx';

enum ThemeType {
  default = 'border border-gray-300',
  success = 'bg-primary-500 text-white',
  danger = 'bg-red-500 text-white',
  warning = 'bg-yellow-400 text-yellow-900',
  info = 'bg-sky-500 text-white',
}

type PropTypes = {
  className?: string;
  theme?: keyof typeof ThemeType;
  size?: 'xl' | 'lg' | 'sm' | 'xs';
  title?: string;
  children: React.ReactNode;
};

export default function Badge({ className, size = 'sm', theme = 'default', title, children }: PropTypes) {
  const sizes = {
    xs: 'text-xs font-medium py-0.5 px-1.5 rounded-full',
    sm: 'text-xs md:text-sm font-medium py-0.5 px-2 rounded-full',
    lg: 'text-xs md:text-sm font-medium py-1 px-3 rounded-full',
    xl: 'text-sm md:text-md font-medium py-1.5 px-4 rounded-full',
  };

  // * generates theme classes based on ThemeType enum
  const themes: { [key: string]: ThemeType }[] = Object.keys(ThemeType).map((key) => ({ [key]: ThemeType[key as keyof typeof ThemeType] }));
  const themeClasses = themes.find((themeObj) => Object.keys(themeObj)[0] === theme)?.[theme];

  const sizeClassname = sizes[size || 'sm'];

  const classes = clsx(`whitespace-nowrap`, themeClasses, sizeClassname, className);
  return <span className={classes} title={title}>{children}</span>;
}
