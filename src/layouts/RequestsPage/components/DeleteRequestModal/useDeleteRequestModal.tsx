import { type Dispatch, type SetStateAction } from 'react';
import toast from 'react-hot-toast';

import api from '@/services/api';

interface IUseRequestModal {
  onClose: () => void;
  setIsMounted: Dispatch<SetStateAction<boolean>>;
}

const useDeleteRequestModal = ({ onClose, setIsMounted }: IUseRequestModal) => {
  const handleClose = () => {
    setIsMounted(false);
    onClose();
  };

  const onDelete = (id?: string) => {
    try {
      api
        .delete(`/requisicao/${id}`)
        .then(() => {
          toast.success('Requisição deletada com sucesso');
        })
        .catch(() => {
          toast.error('Erro ao deletar requisição');
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

export default useDeleteRequestModal;
