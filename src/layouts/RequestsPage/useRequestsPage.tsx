import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { handleGetRequests } from './services/requests';
import type { Requisicao } from './services/types';

const useRequestsPage = () => {
  const [data, setData] = useState<Array<Requisicao> | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<Requisicao>();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isDeleteRequestModalOpen, setIsDeleteRequestModalOpen] =
    useState(false);

  useEffect(() => {
    if (!isRequestModalOpen) {
      handleData();
    }
  }, [isRequestModalOpen]);

  const handleData = () => {
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
  };

  return {
    data,
    isRequestModalOpen,
    setIsRequestModalOpen,
    selectedRequest,
    setSelectedRequest,
    isDeleteRequestModalOpen,
    setIsDeleteRequestModalOpen,
    handleData,
  };
};

export default useRequestsPage;
