import { type Dispatch, type FC, type SetStateAction } from 'react';

import Button from '@/components/Button';
import Modal from '@/components/Modal';

import type { Requisicao } from '../../services/types';
import useDeleteRequestModal from './useDeleteRequestModal';

interface DeleteRequestModalProps {
  request?: Requisicao;
  onClose: () => void;
  isMounted: boolean;
  setIsMounted: Dispatch<SetStateAction<boolean>>;
}

const DeleteRequestModal: FC<DeleteRequestModalProps> = ({
  request,
  onClose,
  isMounted,
  setIsMounted,
}) => {
  const { handleClose, onDelete } = useDeleteRequestModal({
    onClose,
    setIsMounted,
  });

  return (
    <Modal
      onClose={handleClose}
      isMounted={isMounted}
      setIsMounted={setIsMounted}
    >
      <div className="flex max-w-[320px] flex-col px-4 py-2">
        <p className="text-center text-gray-700">
          Tem certeza que deseja deletar a requisição{' '}
          <span className="font-bold">{request?.titulo}</span>?
        </p>
        <div className="mt-3 flex flex-row gap-2 self-center">
          <Button type="button" onClick={handleClose} hierarchy="secondary">
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={() => {
              onDelete(request?.idRequisicao);
            }}
            hierarchy="critical"
          >
            Deletar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteRequestModal;
