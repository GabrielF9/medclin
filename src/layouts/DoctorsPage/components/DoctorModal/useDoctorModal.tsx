import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import api from '@/services/api';
import { isObjectDifferent } from '@/utils/isObjectDifferent';

import type { ICreateMedico, Medico } from '../../services/types';

interface IUseDoctorModal {
  doctor?: Medico;
  onClose: () => void;
  setIsMounted: Dispatch<SetStateAction<boolean>>;
}

const useDoctorModal = ({ doctor, onClose, setIsMounted }: IUseDoctorModal) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    getValues,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ICreateMedico>({
    mode: 'onChange',
    defaultValues: {
      crm: doctor?.crm || '',
      especialidade: doctor?.especialidade || '',
      nome: doctor?.usuario?.nome || '',
      sobrenome: doctor?.usuario?.sobrenome || '',
      email: doctor?.usuario?.email || '',
      cpf: doctor?.usuario?.cpf || '',
      telefone: doctor?.usuario?.telefone || '',
      dataNascimento: doctor?.usuario?.dataNascimento || '',
      ativo: doctor ? doctor?.usuario?.ativo : true,
    },
  });
  const formWatch = watch();

  const [isDeleteDoctorAlertOpen, setIsDeleteDoctorAlertOpen] = useState(false);

  const isEditted = useCallback(() => {
    if (!doctor) return true;

    const formValues = getValues();

    const formattedNurse: ICreateMedico = {
      crm: doctor.crm,
      especialidade: doctor.especialidade,
      nome: doctor.usuario.nome,
      sobrenome: doctor.usuario.sobrenome,
      email: doctor.usuario.email,
      cpf: doctor.usuario.cpf,
      telefone: doctor.usuario.telefone,
      dataNascimento: doctor.usuario.dataNascimento,
      ativo: doctor.usuario.ativo,
    };

    return isObjectDifferent(formattedNurse, formValues);
  }, [formWatch]);

  const handleClose = () => {
    reset();
    clearErrors();
    setIsMounted(false);
    onClose();
  };

  const onSubmit: SubmitHandler<ICreateMedico> = (data) => {
    try {
      if (isEditted() && doctor) {
        api
          .put(`/medicos/${doctor.idMedico}`, data)
          .then(() => {
            toast.success('Medico editado com sucesso');
          })
          .catch(() => {
            toast.error('Erro ao editar Medico');
          });
        return;
      }

      api
        .post('/medicos', data)
        .then(() => {
          toast.success('Medico cadastrado com sucesso');
        })
        .catch(() => {
          toast.error('Erro ao cadastrar Medico');
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
    isDeleteDoctorAlertOpen,
    setIsDeleteDoctorAlertOpen,
  };
};

export default useDoctorModal;
