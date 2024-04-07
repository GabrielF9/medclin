import { type Dispatch, type FC, type SetStateAction } from 'react';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import { Toggle } from '@/components/Toggle';

import type { Requisicao } from '../../services/types';
import useRequestModal from './useRequestModal';

interface RequestModalProps {
  request?: Requisicao;
  onClose: () => void;
  isMounted: boolean;
  setIsMounted: Dispatch<SetStateAction<boolean>>;
}

const RequestModal: FC<RequestModalProps> = ({
  request,
  onClose,
  ...props
}) => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isValid,
    isEditted,
    handleClose,
    onSubmit,
  } = useRequestModal({
    request,
    onClose,
    setIsMounted: props.setIsMounted,
  });

  return (
    <Modal onClose={handleClose} {...props}>
      <div className="flex min-w-[420px] flex-col gap-3">
        <h2 className="border-b border-gray-700/20 px-4 pt-2 text-xl font-bold">
          {request ? 'Editar Atendente' : 'Nova Requisição'}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col px-4 pb-4"
        >
          <Input
            label="Título"
            type="text"
            id="titulo"
            placeholder="Título da Requisição"
            error={errors.titulo?.message}
            disabled={isSubmitting}
            register={register}
            validationSchema={{
              required: 'Campo título é obrigatório',
            }}
          />

          <Input
            label="Descrição"
            type="text"
            id="descricao"
            placeholder="Descrição da Requisição"
            error={errors.descricao?.message}
            disabled={isSubmitting}
            register={register}
            validationSchema={{
              required: 'Campo descrição é obrigatório',
            }}
          />

          <Toggle
            label="Urgente"
            id="urgente"
            disabled={isSubmitting}
            register={register}
          />

          <div className="mt-3 flex flex-row gap-2 self-end">
            <Button type="button" onClick={handleClose} hierarchy="secondary">
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting || !isValid || !isEditted()}
            >
              {request ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RequestModal;
