import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import api from '@/services/api';
import { isObjectDifferent } from '@/utils/isObjectDifferent';

import type { Enfermeiro, ICreateEnfermeiro } from '../../services/types';

interface IUseNurseModal {
  nurse?: Enfermeiro;
  onClose: () => void;
  setIsMounted: Dispatch<SetStateAction<boolean>>;
}

const useNurseModal = ({ nurse, onClose, setIsMounted }: IUseNurseModal) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    getValues,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ICreateEnfermeiro>({
    mode: 'onChange',
    defaultValues: {
      numeroRegistro: nurse?.numeroRegistro || '',
      especialidade: nurse?.especialidade || '',
      nome: nurse?.usuario?.nome || '',
      sobrenome: nurse?.usuario?.sobrenome || '',
      email: nurse?.usuario?.email || '',
      cpf: nurse?.usuario?.cpf || '',
      telefone: nurse?.usuario?.telefone || '',
      dataNascimento: nurse?.usuario?.dataNascimento || '',
      ativo: nurse ? nurse?.usuario?.ativo : true,
    },
  });
  const formWatch = watch();

  const [isDeleteNurseAlertOpen, setIsDeleteNurseAlertOpen] = useState(false);

  const isEditted = useCallback(() => {
    if (!nurse) return true;

    const formValues = getValues();

    const formattedNurse: ICreateEnfermeiro = {
      numeroRegistro: nurse.numeroRegistro,
      especialidade: nurse.especialidade,
      nome: nurse.usuario.nome,
      sobrenome: nurse.usuario.sobrenome,
      email: nurse.usuario.email,
      cpf: nurse.usuario.cpf,
      telefone: nurse.usuario.telefone,
      dataNascimento: nurse.usuario.dataNascimento,
      ativo: nurse.usuario.ativo,
    };

    return isObjectDifferent(formattedNurse, formValues);
  }, [formWatch]);

  const handleClose = () => {
    reset();
    clearErrors();
    setIsMounted(false);
    onClose();
  };

  const onSubmit: SubmitHandler<ICreateEnfermeiro> = (data) => {
    try {
      if (isEditted() && nurse) {
        api
          .put(`/enfermeiro/${nurse.idEnfermeiro}`, data)
          .then(() => {
            toast.success('Enfermeiro editado com sucesso');
          })
          .catch(() => {
            toast.error('Erro ao editar enfermeiro');
          });
        return;
      }

      api
        .post('/enfermeiros', data)
        .then(() => {
          toast.success('Enfermeiro cadastrado com sucesso');
        })
        .catch(() => {
          toast.error('Erro ao cadastrar enfermeiro');
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
    isDeleteNurseAlertOpen,
    setIsDeleteNurseAlertOpen,
  };
};

export default useNurseModal;
