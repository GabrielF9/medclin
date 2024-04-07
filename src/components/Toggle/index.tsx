import type { FC } from 'react';
import type { UseFormRegister } from 'react-hook-form';

import If from '../If';

interface IToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  disabled?: boolean;
  register?: UseFormRegister<any>;
}

export const Toggle: FC<IToggleProps> = ({
  id,
  label,
  disabled,
  register,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      <span className="mb-2 block select-none font-medium">{label}</span>

      <label
        className="relative inline-flex cursor-pointer items-center"
        htmlFor={id}
        aria-label={label}
      >
        <If
          condition={!!register}
          renderIf={
            <input
              type="checkbox"
              value=""
              className="peer sr-only"
              id={id}
              disabled={disabled}
              // @ts-ignore-next-line
              {...register(id)}
              {...props}
            />
          }
          renderElse={
            <input
              type="checkbox"
              value=""
              className="peer sr-only"
              id={id}
              disabled={disabled}
              {...props}
            />
          }
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-400 after:absolute after:start-[2px] after:top-0.5 after:size-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-700 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full" />
      </label>
    </div>
  );
};
