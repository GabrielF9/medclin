import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import type { EscalaTrabalho } from './services/types';
import { handleGetWorkSchedule } from './services/workSchedule';

const useWorkSchedulePage = () => {
  const [data, setData] = useState<Array<EscalaTrabalho> | null>(null);
  const [selectedWorkSchedule, setSelectedWorkSchedule] =
    useState<EscalaTrabalho>();
  const [isWorkScheduleModalOpen, setIsWorkScheduleModalOpen] = useState(false);
  const [isDeleteWorkScheduleModalOpen, setIsDeleteWorkScheduleModalOpen] =
    useState(false);

  useEffect(() => {
    if (!isWorkScheduleModalOpen) {
      handleData();
    }
  }, [isWorkScheduleModalOpen]);

  const handleData = () => {
    setData(null);

    setTimeout(() => {
      handleGetWorkSchedule()
        .then((response) => {
          setData(response as Array<EscalaTrabalho>);
        })
        .catch((_) => {
          toast.error('Erro ao buscar escala de trabalho');
        });
    }, 500);
  };

  return {
    data,
    isWorkScheduleModalOpen,
    setIsWorkScheduleModalOpen,
    selectedWorkSchedule,
    setSelectedWorkSchedule,
    isDeleteWorkScheduleModalOpen,
    setIsDeleteWorkScheduleModalOpen,
    handleData,
  };
};

export default useWorkSchedulePage;
