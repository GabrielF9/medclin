import type { Dispatch, SetStateAction } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import api from '@/services/api';

import type { ICreateEscalaTrabalho } from '../../services/types';

interface IUseWorkScheduleModal {
  onClose: () => void;
  setIsMounted: Dispatch<SetStateAction<boolean>>;
}

const useWorkScheduleModal = ({
  onClose,
  setIsMounted,
}: IUseWorkScheduleModal) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,

    formState: { errors, isSubmitting, isValid },
  } = useForm<ICreateEscalaTrabalho>({
    mode: 'onChange',
    defaultValues: {
      dia: '',
      horaInicio: '',
      horaFim: '',
      cpf: '',
    },
  });

  const handleClose = () => {
    reset();
    clearErrors();
    setIsMounted(false);
    onClose();
  };

  const onSubmit: SubmitHandler<ICreateEscalaTrabalho> = (data) => {
    try {
      api
        .post('/escala', data)
        .then(() => {
          toast.success('Horário cadastrado com sucesso');
        })
        .catch(() => {
          toast.error('Erro ao cadastrar horário');
        });
    } finally {
      handleClose();
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isValid,
    handleClose,
    onSubmit,
  };
};

export default useWorkScheduleModal;
