import type { ButtonHTMLAttributes } from 'react';
import { Loader } from 'react-feather';
import { tv } from 'tailwind-variants';

import If from '../If';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  hierarchy?: 'primary' | 'secondary' | 'link' | 'critical';
  fluid?: boolean;
}

const buttonStyle = tv({
  base: 'flex min-w-[120px] items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold text-white transition-colors duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary-500 disabled:hover:text-white',
  variants: {
    hierarchy: {
      primary: 'bg-primary-500 hover:bg-primary-600',
      secondary:
        'border border-primary-500 bg-white text-primary-500 hover:bg-primary-500 hover:text-white',
      link: 'bg-transparent text-primary-500 hover:underline',
      critical: 'bg-red-500 hover:bg-red-600',
    },
    width: {
      full: 'w-full',
      base: 'w-fit',
    },
  },
  defaultVariants: {
    hierarchy: 'primary',
  },
});

const Button = ({
  children,
  isLoading,
  hierarchy,
  fluid = false,
  type = 'button',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={buttonStyle({
        hierarchy,
        width: fluid ? 'full' : 'base',
        class: className,
      })}
      {...props}
    >
      <If
        condition={isLoading}
        renderIf={
          <div role="status" className="flex items-center justify-center">
            <Loader className="animate-spin" />
            <span className="sr-only">Carregando...</span>
          </div>
        }
        renderElse={children}
      />
    </button>
  );
};

export default Button;
