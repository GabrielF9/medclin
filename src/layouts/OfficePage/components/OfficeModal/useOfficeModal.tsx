import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import api from '@/services/api';
import { isObjectDifferent } from '@/utils/isObjectDifferent';

import type { ICreateSecretaria, Secretaria } from '../../services/types';

interface IUseOfficeModal {
  office?: Secretaria;
  onClose: () => void;
  setIsMounted: Dispatch<SetStateAction<boolean>>;
}

const useOfficeModal = ({ office, onClose, setIsMounted }: IUseOfficeModal) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    getValues,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ICreateSecretaria>({
    mode: 'onChange',
    defaultValues: {
      ala: office?.ala || '',
      nome: office?.usuario?.nome || '',
      sobrenome: office?.usuario?.sobrenome || '',
      email: office?.usuario?.email || '',
      cpf: office?.usuario?.cpf || '',
      telefone: office?.usuario?.telefone || '',
      dataNascimento: office?.usuario?.dataNascimento || '',
      ativo: office ? office?.usuario?.ativo : true,
    },
  });
  const formWatch = watch();

  const [isDeleteOfficeAlertOpen, setIsDeleteOfficeAlertOpen] = useState(false);

  const isEditted = useCallback(() => {
    if (!office) return true;

    const formValues = getValues();

    const formattedOffice: ICreateSecretaria = {
      ala: office.ala,
      nome: office.usuario.nome,
      sobrenome: office.usuario.sobrenome,
      email: office.usuario.email,
      cpf: office.usuario.cpf,
      telefone: office.usuario.telefone,
      dataNascimento: office.usuario.dataNascimento,
      ativo: office.usuario.ativo,
    };

    return isObjectDifferent(formattedOffice, formValues);
  }, [formWatch]);

  const handleClose = () => {
    reset();
    clearErrors();
    setIsMounted(false);
    onClose();
  };

  const onSubmit: SubmitHandler<ICreateSecretaria> = (data) => {
    try {
      if (isEditted() && office) {
        api
          .put(`/secretaria/${office.idSecretaria}`, data)
          .then(() => {
            toast.success('Atendente editado com sucesso');
          })
          .catch(() => {
            toast.error('Erro ao editar atendente');
          });
        return;
      }

      api
        .post('/secretaria', data)
        .then(() => {
          toast.success('Atendente cadastrado com sucesso');
        })
        .catch(() => {
          toast.error('Erro ao cadastrar atendente');
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
    isDeleteOfficeAlertOpen,
    setIsDeleteOfficeAlertOpen,
  };
};

export default useOfficeModal;
