import { type Dispatch, type FC, type SetStateAction } from 'react';

import Button from '@/components/Button';
import Modal from '@/components/Modal';

import type { EscalaTrabalho } from '../../services/types';
import useDeleteWorkScheduleModal from './useDeleteWorkScheduleModal';

interface DeleteWorkScheduleModalProps {
  workSchedule?: EscalaTrabalho;
  onClose: () => void;
  isMounted: boolean;
  setIsMounted: Dispatch<SetStateAction<boolean>>;
}

const DeleteWorkScheduleModal: FC<DeleteWorkScheduleModalProps> = ({
  workSchedule,
  onClose,
  isMounted,
  setIsMounted,
}) => {
  const { handleClose, onDelete } = useDeleteWorkScheduleModal({
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
          Tem certeza que deseja deletar o horário?
        </p>
        <div className="mt-3 flex flex-row gap-2 self-center">
          <Button type="button" onClick={handleClose} hierarchy="secondary">
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={() => {
              onDelete(workSchedule?.idEscalaTrabalho);
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

export default DeleteWorkScheduleModal;
