import ClinicalF from '@/icons/clinical_f.svg';
import Doctor from '@/icons/doctor_female.svg';
import HealthWorker from '@/icons/health_worker.svg';
import Hospital from '@/icons/hospital.svg';
import Nurse from '@/icons/nurse.svg';
import Patient from "@/icons/paciente.svg";

export const SIDEBAR_ITEMS = [
  {
    label: 'Início',
    path: '/home',
    icon: Hospital,
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
  {
    label: 'Pacientes',
    path: '/pacientes',
    icon: Patient,
  },
];
