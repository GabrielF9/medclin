import { type Dispatch, type FC, type SetStateAction } from 'react';
import { useHookFormMask } from 'use-mask-input';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import { isValidCPF } from '@/utils/validators/cpf';

import useWorkScheduleModal from './useWorkScheduleModal';

interface WorkScheduleModalProps {
  onClose: () => void;
  isMounted: boolean;
  setIsMounted: Dispatch<SetStateAction<boolean>>;
}

const WorkScheduleModal: FC<WorkScheduleModalProps> = ({
  onClose,
  ...props
}) => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isValid,
    handleClose,
    onSubmit,
  } = useWorkScheduleModal({
    onClose,
    setIsMounted: props.setIsMounted,
  });
  const registerWithMask = useHookFormMask(register);

  return (
    <Modal onClose={handleClose} {...props}>
      <div className="flex min-w-[420px] flex-col gap-3">
        <h2 className="border-b border-gray-700/20 px-4 pt-2 text-xl font-bold">
          Novo Horário
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col px-4 pb-4"
        >
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
              label="Dia"
              type="date"
              id="dia"
              placeholder="dd/mm/yyyy"
              error={errors.dia?.message}
              disabled={isSubmitting}
              register={register}
              validationSchema={{
                required: 'Campo dia é obrigatório',
              }}
            />
          </div>

          <div className="flex gap-3">
            <Input
              label="Hora Início"
              type="text"
              placeholder="19:15"
              id="horaInicio"
              error={errors.horaInicio?.message}
              disabled={isSubmitting}
              register={register}
              validationSchema={{
                required: 'Campo hora início é obrigatório',
              }}
              registerWithMask={registerWithMask}
              mask="99:99"
            />

            <Input
              label="Hora Fim"
              type="text"
              id="horaFim"
              placeholder="22:15"
              error={errors.horaFim?.message}
              disabled={isSubmitting}
              register={register}
              validationSchema={{
                required: 'Campo hora fim é obrigatório',
              }}
              registerWithMask={registerWithMask}
              mask="99:99"
            />
          </div>

          <div className="mt-3 flex flex-row gap-2 self-end">
            <Button type="button" onClick={handleClose} hierarchy="secondary">
              Cancelar
            </Button>

            <Button type="submit" disabled={isSubmitting || !isValid}>
              Criar
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default WorkScheduleModal;
