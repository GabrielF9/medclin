import { Edit, Plus } from 'react-feather';

import Button from '@/components/Button';
import { formatDate, formatPhone } from '@/utils/formatters';

import AppLayout from '../AppLayout';
import AppLayoutSkeleton from '../AppLayout/AppLayoutSkeleton';
import PatientModal from './components/PatientModal';
import usePatientsPage from './usePatientsPage';

const PatientPage = () => {
  const {
    data,
    isPatientModalOpen,
    setIsPatientModalOpen,
    selectedPatient,
    setSelectePatient,
  } = usePatientsPage();

  if (!data) {
    return <AppLayoutSkeleton title="Pacientes" />;
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-primary-500">Pacientes</h1>

      <Button className="mt-3" onClick={() => setIsPatientModalOpen(true)}>
        <Plus width={20} height={20} />
        <span>Nova</span>
      </Button>

      <div className="mt-3 flex-1 overflow-y-scroll">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>data de nascimento</th>
              <th aria-hidden />
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.cpf}>
                <td>{item.nome}</td>
                <td>{item.email}</td>
                <td>{formatPhone(item.telefone)}</td>
                <td>{formatDate(item.dataNascimento)}</td>
                <td>
                  <button
                    aria-label="Editar"
                    type="button"
                    className="text-primary-500 duration-100 hover:text-primary-600"
                    onClick={() => {
                      setSelectePatient(item);
                      setIsPatientModalOpen(true);
                    }}
                  >
                    <Edit width={20} height={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isPatientModalOpen && (
        <PatientModal
          patient={selectedPatient}
          isMounted={isPatientModalOpen}
          setIsMounted={setIsPatientModalOpen}
          onClose={() => setSelectePatient(undefined)}
        />
      )}
    </AppLayout>
  );
};

export default PatientPage;
