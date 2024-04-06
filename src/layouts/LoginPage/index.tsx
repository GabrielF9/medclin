import Image from 'next/image';

import Button from '@/components/Button';
import If from '@/components/If';
import Input from '@/components/Input';
import { isValidEmail } from '@/utils/validators/email';

import useLoginPage from './useLoginPage';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    isSubmitting,
    errors,
    generalError,
    onSubmit,
  } = useLoginPage();

  return (
    <div className="h-screen w-screen">
      <div className="flex size-full justify-between">
        <div className="flex h-full flex-auto flex-col items-center justify-center">
          <div className="flex w-96 flex-col">
            <h1 className="text-3xl font-bold text-primary-500">Boas Vindas</h1>
            <p className="text-sm text-gray-700">
              Insira seu email e senha para entrar
            </p>

            <form className="mt-10 w-full" onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Email"
                type="email"
                id="email"
                placeholder="email@email.com"
                error={errors.email?.message}
                disabled={isSubmitting}
                autoComplete="email"
                register={register}
                validationSchema={{
                  required: 'Campo email é obrigatório',
                  validate: (value) => {
                    if (!isValidEmail(value)) {
                      return 'Email inválido';
                    }
                    return true;
                  },
                }}
              />

              <Input
                label="Senha"
                type="password"
                id="password"
                placeholder="********"
                error={errors.password?.message}
                disabled={isSubmitting}
                autoComplete="current-password"
                register={register}
                validationSchema={{
                  required: 'Campo senha é obrigatório',
                }}
              />

              <If
                condition={!!generalError}
                renderIf={
                  <div className="mb-2 text-center text-sm text-red-500">
                    {generalError}
                  </div>
                }
              />

              <Button
                className="mt-8"
                fluid
                type="submit"
                isLoading={isSubmitting}
              >
                Entrar
              </Button>
            </form>
          </div>
        </div>

        <div className="flex h-full w-[500px] flex-row items-center justify-center gap-4 bg-primary-500 bg-login-pattern bg-cover text-white">
          <Image
            src="/images/logo-white.png"
            aria-hidden
            alt=""
            width={100}
            height={100}
          />
          <div className="h-[50px] w-[2px] rounded-sm bg-white" aria-hidden />
          <h2 className="text-2xl font-bold">MedClin</h2>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
