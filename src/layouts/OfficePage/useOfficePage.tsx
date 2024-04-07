import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { handleGetOffices } from './services/office';
import type { Secretaria } from './services/types';

const useOfficePage = () => {
  const [data, setData] = useState<Array<Secretaria> | null>(null);
  const [isOfficeModalOpen, setIsOfficeModalOpen] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<Secretaria>();

  useEffect(() => {
    if (!selectedOffice) {
      setData(null);

      handleGetOffices()
        .then((response) => {
          setData(response as Array<Secretaria>);
        })
        .catch((_) => {
          toast.error('Erro ao buscar secretarias');
        });
    }
  }, [selectedOffice]);

  return {
    data,
    isOfficeModalOpen,
    setIsOfficeModalOpen,
    selectedOffice,
    setSelectedOffice,
  };
};

export default useOfficePage;
