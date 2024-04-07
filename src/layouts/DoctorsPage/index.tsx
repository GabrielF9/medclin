import { Edit, Plus } from 'react-feather';

import Button from '@/components/Button';
import { formatCPF, formatDate, formatPhone } from '@/utils/formatters';

import AppLayout from '../AppLayout';
import AppLayoutSkeleton from '../AppLayout/AppLayoutSkeleton';
import DoctorModal from './components/DoctorModal';
import useDoctorsPage from './useDoctorsPage';

const DoctorPage = () => {
  const {
    data,
    isDoctorModalOpen,
    setIsDoctorModalOpen,
    selectedDoctor,
    setSelectedDoctor,
  } = useDoctorsPage();

  if (!data) {
    return <AppLayoutSkeleton title="Medico" />;
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-primary-500">Médicos</h1>

      <Button className="mt-3" onClick={() => setIsDoctorModalOpen(true)}>
        <Plus width={20} height={20} />
        <span>Novo</span>
      </Button>

      <div className="mt-3 flex-1 overflow-y-scroll">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Crm</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Data de Nascimento</th>
              <th aria-hidden />
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.idMedico}>
                <td>{`${item.usuario.nome} ${item.usuario.sobrenome}`}</td>
                <td className="td-mono">{formatCPF(item.usuario.cpf)}</td>
                <td>{item.crm}</td>
                <td>{item.usuario.email}</td>
                <td className="td-mono">
                  {formatPhone(item.usuario.telefone)}
                </td>
                <td className="td-mono">
                  {formatDate(item.usuario.dataNascimento)}
                </td>
                <td>
                  <button
                    aria-label="Editar"
                    type="button"
                    className="text-primary-500 duration-100 hover:text-primary-600"
                    onClick={() => {
                      setSelectedDoctor(item);
                      setIsDoctorModalOpen(true);
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

      {isDoctorModalOpen && (
        <DoctorModal
          doctor={selectedDoctor}
          isMounted={isDoctorModalOpen}
          setIsMounted={setIsDoctorModalOpen}
          onClose={() => setSelectedDoctor(undefined)}
        />
      )}
    </AppLayout>
  );
};

export default DoctorPage;
