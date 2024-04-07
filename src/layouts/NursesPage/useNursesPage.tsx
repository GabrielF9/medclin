import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { handleGetNurses } from './services/nurse';
import type { Enfermeiro } from './services/types';

const useNursePage = () => {
  const [data, setData] = useState<Array<Enfermeiro> | null>(null);
  const [isNurseModalOpen, setIsNurseModalOpen] = useState(false);
  const [selectedNurse, setSelectedNurse] = useState<Enfermeiro>();

  useEffect(() => {
    if (!selectedNurse) {
      setData(null);

      handleGetNurses()
        .then((response) => {
          setData(response as Array<Enfermeiro>);
        })
        .catch((_) => {
          toast.error('Erro ao buscar enfermeiras');
        });
    }
  }, [selectedNurse]);

  return {
    data,
    isNurseModalOpen,
    setIsNurseModalOpen,
    selectedNurse,
    setSelectedNurse,
  };
};

export default useNursePage;
