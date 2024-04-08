import { type Dispatch, type SetStateAction } from 'react';
import toast from 'react-hot-toast';

import api from '@/services/api';

interface IUseWorkScheduleModal {
  onClose: () => void;
  setIsMounted: Dispatch<SetStateAction<boolean>>;
}

const useDeleteWorkScheduleModal = ({
  onClose,
  setIsMounted,
}: IUseWorkScheduleModal) => {
  const handleClose = () => {
    setIsMounted(false);
    onClose();
  };

  const onDelete = (id?: string) => {
    try {
      api
        .delete(`/escala/${id}`)
        .then(() => {
          toast.success('Horário deletado com sucesso');
        })
        .catch(() => {
          toast.error('Erro ao deletar horário');
        });
    } finally {
      handleClose();
    }
  };

  return {
    handleClose,
    onDelete,
  };
};

export default useDeleteWorkScheduleModal;
