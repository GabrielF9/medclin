import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import api from '@/services/api';
import storage from '@/utils/browser/storage';
import { isObjectDifferent } from '@/utils/isObjectDifferent';

import type { ICreateRequisicao, Requisicao } from '../../services/types';

interface IUseRequestModal {
  request?: Requisicao;
  onClose: () => void;
  setIsMounted: Dispatch<SetStateAction<boolean>>;
}

const useRequestModal = ({
  request,
  onClose,
  setIsMounted,
}: IUseRequestModal) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    getValues,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ICreateRequisicao>({
    mode: 'onChange',
    defaultValues: {
      titulo: request?.titulo || '',
      descricao: request?.descricao || '',
      urgente: request?.urgente,
    },
  });
  const formWatch = watch();

  const [isDeleteRequestAlertOpen, setIsDeleteRequestAlertOpen] =
    useState(false);

  const isEditted = useCallback(() => {
    if (!request) return true;

    const formValues = getValues();

    const formattedRequest: ICreateRequisicao = {
      titulo: request.titulo,
      descricao: request.descricao,
      urgente: request.urgente,
    };

    return isObjectDifferent(formattedRequest, formValues);
  }, [formWatch]);

  const handleClose = () => {
    reset();
    clearErrors();
    setIsMounted(false);
    onClose();
  };

  const onSubmit: SubmitHandler<ICreateRequisicao> = (data) => {
    try {
      if (isEditted() && request) {
        api
          .put(`/requisicao/${request.idRequisicao}`, data)
          .then(() => {
            toast.success('Requisição editada com sucesso');
          })
          .catch(() => {
            toast.error('Erro ao editar requisição');
          });
        return;
      }

      const user = storage.local.getItem('user');
      const userCpf = user?.cpf;

      api
        .post('/requisicao', { ...data, usuarioCpf: userCpf })
        .then(() => {
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
    isDeleteRequestAlertOpen,
    setIsDeleteRequestAlertOpen,
  };
};

export default useRequestModal;
