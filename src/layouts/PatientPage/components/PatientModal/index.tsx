import { type Dispatch, type FC, type SetStateAction } from 'react';
import { useHookFormMask } from 'use-mask-input';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import { isValidCPF } from '@/utils/validators/cpf';
import { isValidEmail } from '@/utils/validators/email';
import { isValidPhone } from '@/utils/validators/phone';

import type { Paciente } from '../../services/types';
import usePatientModal from './usePatientModal';

interface PatientModalProps {
  patient?: Paciente;
  onClose: () => void;
  isMounted: boolean;
  setIsMounted: Dispatch<SetStateAction<boolean>>;
}

const RequestModal: FC<PatientModalProps> = ({
  patient,
  onClose,
  ...props
}) => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isValid,
    isEditted,
    handleClose,
    onSubmit,
  } = usePatientModal({
    patient,
    onClose,
    setIsMounted: props.setIsMounted,
  });
  const registerWithMask = useHookFormMask(register);
  return (
    <Modal onClose={handleClose} {...props}>
      <div className="flex min-w-[420px] flex-col gap-3">
        <h2 className="border-b border-gray-700/20 px-4 pt-2 text-xl font-bold">
          {patient ? 'Editar Atendente' : 'Nova Paciente'}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col px-4 pb-4"
        >
          <div className="flex gap-3">
            <Input
              label="Nome"
              type="text"
              id="nome"
              placeholder="John"
              error={errors.nome?.message}
              disabled={isSubmitting}
              autoComplete="name"
              register={register}
              validationSchema={{
                required: 'Campo nome é obrigatório',
              }}
            />
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
                validate: (value: string) => {
                  if (!isValidEmail(value)) {
                    return 'Email inválido';
                  }
                  return true;
                },
              }}
            />
          </div>

          <div className="flex gap-3">
            <Input
              label="CPF"
              type="text"
              id="cpf"
              placeholder="000.000.000-00"
              error={errors.cpf?.message}
              disabled={isSubmitting}
              autoComplete="off"
              register={register}
              validationSchema={{
                required: 'Campo cpf é obrigatório',
                validate: (value: string) => {
                  if (!isValidCPF(value)) {
                    return 'CPF inválido';
                  }
                  return true;
                },
              }}
              registerWithMask={registerWithMask}
              mask="999.999.999-99"
            />

            <Input
              label="Telefone"
              type="text"
              id="telefone"
              placeholder="(00) 00000-0000"
              error={errors.telefone?.message}
              disabled={isSubmitting}
              autoComplete="tel"
              register={register}
              validationSchema={{
                required: 'Campo telefone é obrigatório',
                validate: (value: string) => {
                  if (!isValidPhone(value)) {
                    return 'Telefone inválido';
                  }
                  return true;
                },
              }}
              registerWithMask={registerWithMask}
              mask={['(99) 9999-9999', '(99) 99999-9999']}
            />
          </div>

          <div className="flex gap-3">
            <Input
              label="Data de Nascimento"
              type="date"
              id="dataNascimento"
              error={errors.dataNascimento?.message}
              disabled={isSubmitting}
              register={register}
              validationSchema={{
                required: 'Campo data de nascimento é obrigatório',
              }}
            />
          </div>

          <div className="mt-3 flex flex-row gap-2 self-end">
            <Button type="button" onClick={handleClose} hierarchy="secondary">
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting || !isValid || !isEditted()}
            >
              {patient ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RequestModal;
