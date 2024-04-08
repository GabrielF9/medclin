import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { handleGetPatients } from './services/patients';
import type { Paciente } from './services/types';

const usePatientsPage = () => {
    const [data, setData] = useState<Array<Paciente> | null>(null);
    const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
    const [selectedPatient, setSelectePatient] = useState<Paciente>();

    useEffect(() => {
        if (!isPatientModalOpen) {
            setData(null);

            setTimeout(() => {
                handleGetPatients()
                    .then((response) => {
                        setData(response as Array<Paciente>);
                    })
                    .catch((_) => {
                        toast.error('Erro ao buscar Pacientes');
                    });
            }, 500);
        }
    }, [isPatientModalOpen]);

    return {
        data,
        isPatientModalOpen,
        setIsPatientModalOpen,
        selectedPatient,
        setSelectePatient,
    };
};

export default usePatientsPage;
