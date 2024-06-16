import clsx from 'clsx';
import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Card = ({ className, children }: Props) => {
  return <div className={clsx('rounded-[2rem] border border-gray-200 bg-white px-4 py-8 shadow-sm sm:px-8', className)}>{children}</div>;
};

export default Card;

export const CardFooter = ({ children }: Props) => {
  return <div className='-mx-4 -mb-8 mt-6 flex rounded-b-[2rem] bg-gray-50  px-4 py-3 sm:-mx-8 sm:px-6'>{children}</div>;
};
