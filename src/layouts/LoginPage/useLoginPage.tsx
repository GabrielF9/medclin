import { useRouter } from 'next/router';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { handleLogin } from './services/login';

interface IFormValues {
  email: string;
  password: string;
}

const useLoginPage = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<IFormValues>({ mode: 'onSubmit' });
  const router = useRouter();

  const [generalError, setGeneralError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    try {
      clearErrors();
      setGeneralError(null);

      await handleLogin(data.email, data.password);

      setTimeout(() => {
        router.push('/escala');
      }, 500);
    } catch (error) {
      setGeneralError('Usuário ou senha inválidos');
    }
  };

  return {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    setError,
    isSubmitting,
    errors,
    generalError,
    onSubmit,
  };
};

export default useLoginPage;
