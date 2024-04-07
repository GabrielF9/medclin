import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { handleGetDoctors } from './services/doctor';
import type { Medico } from './services/types';

const useDoctorsPage = () => {
  const [data, setData] = useState<Array<Medico> | null>(null);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Medico>();

  useEffect(() => {
    if (!selectedDoctor) {
      setData(null);

      handleGetDoctors()
        .then((response) => {
          setData(response as Array<Medico>);
        })
        .catch((_) => {
          toast.error('Erro ao buscar enfermeiras');
        });
    }
  }, [selectedDoctor]);

  return {
    data,
    isDoctorModalOpen,
    setIsDoctorModalOpen,
    selectedDoctor,
    setSelectedDoctor,
  };
};

export default useDoctorsPage;
