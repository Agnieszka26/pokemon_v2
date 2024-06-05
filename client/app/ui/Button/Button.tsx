import cn from '@/app/utils/className';
import { ComponentProps } from 'react';

type ButtonProps = {
  label: string;
  className?: string;
} & ComponentProps<'button'>;

export const Button = ({ label, className, ...rest }: ButtonProps) => {
  return (
    <button className={cn('btn', className)} {...rest}>
      {label}
    </button>
  );
};
