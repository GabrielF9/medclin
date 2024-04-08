import Calendar from '@/icons/calendar.svg';
import ClinicalF from '@/icons/clinical_f.svg';
import Doctor from '@/icons/doctor_female.svg';
import HealthWorker from '@/icons/health_worker.svg';
import Hospital from '@/icons/hospital.svg';
import Nurse from '@/icons/nurse.svg';

export const SIDEBAR_ITEMS = [
  {
    label: 'Início',
    path: '/home',
    icon: Hospital,
  },
  {
    label: 'Escala',
    path: '/escala',
    icon: Calendar,
  },
  {
    label: 'Requisições',
    path: '/requisicoes',
    icon: ClinicalF,
  },
  {
    label: 'Médicos',
    path: '/gerencia/medicos',
    icon: Doctor,
  },
  {
    label: 'Enfermeiros',
    path: '/gerencia/enfermeiros',
    icon: Nurse,
  },
  {
    label: 'Atendentes',
    path: '/gerencia/atendentes',
    icon: HealthWorker,
  },
];
