import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { handleGetRequests } from './services/requests';
import type { Requisicao } from './services/types';

const useRequestsPage = () => {
  const [data, setData] = useState<Array<Requisicao> | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Requisicao>();

  useEffect(() => {
    if (!isRequestModalOpen) {
      setData(null);

      setTimeout(() => {
        handleGetRequests()
          .then((response) => {
            setData(response as Array<Requisicao>);
          })
          .catch((_) => {
            toast.error('Erro ao buscar requisições');
          });
      }, 500);
    }
  }, [isRequestModalOpen]);

  return {
    data,
    isRequestModalOpen,
    setIsRequestModalOpen,
    selectedRequest,
    setSelectedRequest,
  };
};

export default useRequestsPage;
