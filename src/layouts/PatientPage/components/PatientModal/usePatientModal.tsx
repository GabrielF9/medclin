import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import api from '@/services/api';
import { isObjectDifferent } from '@/utils/isObjectDifferent';

import type { ICreatePaciente, Paciente } from '../../services/types';

interface IUsePacienteModal {
  patient?: Paciente;
  onClose: () => void;
  setIsMounted: Dispatch<SetStateAction<boolean>>;
}

const usePatientModal = ({
  patient,
  onClose,
  setIsMounted,
}: IUsePacienteModal) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    getValues,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ICreatePaciente>({
    mode: 'onChange',
    defaultValues: {
      cpf: patient?.cpf || '',
      nome: patient?.nome || '',
      email: patient?.email || '',
      dataNascimento: patient?.dataNascimento || '',
      telefone: patient?.telefone || '',
    },
  });
  const formWatch = watch();

  const [isDeletePatientAlertOpen, setIsDeletePatientAlertOpen] =
    useState(false);

  const isEditted = useCallback(() => {
    if (!patient) return true;

    const formValues = getValues();

    const formattedRequest: ICreatePaciente = {
      cpf: patient.cpf,
      nome: patient.nome,
      email: patient.email,
      dataNascimento: patient.dataNascimento,
      telefone: patient.telefone,
    };

    return isObjectDifferent(formattedRequest, formValues);
  }, [formWatch]);

  const handleClose = () => {
    reset();
    clearErrors();
    setIsMounted(false);
    onClose();
  };

  const onSubmit: SubmitHandler<ICreatePaciente> = (data) => {
    try {
      if (isEditted() && patient) {
        api
          .put(`/paciente/${patient.cpf}`, data)
          .then(() => {
            toast.success('Paciente editado com sucesso');
          })
          .catch(() => {
            toast.error('Erro ao editar Paciente');
          });
        return;
      }

      // const user = storage.local.getItem('user');
      // const userCpf = user?.cpf;

      api
        .post('/paciente', { ...data })
        .then(() => {
          console.log(data);
          toast.success('Requisição cadastrada com sucesso');
        })
        .catch(() => {
          toast.error('Erro ao cadastrar requisição');
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
    isEditted,
    handleClose,
    onSubmit,
    isDeletePatientAlertOpen,
    setIsDeletePatientAlertOpen,
  };
};

export default usePatientModal;
