import classNames from 'classnames';
import { useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import type { RegisterOptions, UseFormRegister } from 'react-hook-form';

import If from '../If';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  containerClassName?: string;
  register?: UseFormRegister<any>;
  validationSchema?: RegisterOptions;
  registerWithMask?: any;
  mask?: string | Array<string>;
}

const Input = ({
  label,
  error,
  id,
  type,
  containerClassName,
  register,
  validationSchema,
  registerWithMask,
  mask,
  ...props
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  const defaultRegister = register ? register(id, validationSchema) : {};
  const registerInput = registerWithMask
    ? registerWithMask(id, mask, validationSchema)
    : defaultRegister;

  return (
    <div className={classNames('mb-4', containerClassName)}>
      <label htmlFor={id} className="mb-2 block select-none font-medium">
        {label}
      </label>

      <div className="autofill flex w-full select-none gap-2 rounded-md border border-gray-300 px-3 py-2 duration-100 focus-within:border-gray-500 focus:outline-none">
        {register && validationSchema ? (
          <input
            className="w-full select-none outline-none"
            id={id}
            type={inputType}
            {...registerInput}
            {...props}
          />
        ) : (
          <input
            className="w-full select-none outline-none"
            id={id}
            type={inputType}
            name={id}
            {...props}
          />
        )}

        <If
          condition={type === 'password'}
          renderIf={
            <If
              condition={isPasswordVisible}
              renderIf={
                <Eye
                  className="cursor-pointer select-none"
                  onClick={() => setIsPasswordVisible(false)}
                />
              }
              renderElse={
                <EyeOff
                  className="cursor-pointer select-none"
                  onClick={() => setIsPasswordVisible(true)}
                />
              }
            />
          }
        />
      </div>

      <If
        condition={!!error}
        renderIf={
          <span className="select-none text-center text-xs text-red-500">
            {error}
          </span>
        }
      />
    </div>
  );
};

export default Input;
