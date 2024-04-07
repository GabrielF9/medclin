import { Edit, Plus } from 'react-feather';

import Button from '@/components/Button';
import { formatCPF, formatDate, formatPhone } from '@/utils/formatters';

import AppLayout from '../AppLayout';
import AppLayoutSkeleton from '../AppLayout/AppLayoutSkeleton';
import NurseModal from './components/NurseModal';
import useNursePage from './useNursesPage';

const NursesPage = () => {
  const {
    data,
    isNurseModalOpen,
    setIsNurseModalOpen,
    selectedNurse,
    setSelectedNurse,
  } = useNursePage();

  if (!data) {
    return <AppLayoutSkeleton title="Enfermeiros" />;
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-primary-500">Enfermeiros</h1>
      <Button className="mt-3" onClick={() => setIsNurseModalOpen(true)}>
        <Plus width={20} height={20} />
        <span>Novo</span>
      </Button>

      <div className="mt-3 flex-1 overflow-y-scroll">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Número de Registro</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Data de Nascimento</th>
              <th aria-hidden />
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.idEnfermeiro}>
                <td>{`${item.usuario.nome} ${item.usuario.sobrenome}`}</td>
                <td className="td-mono">{formatCPF(item.usuario.cpf)}</td>
                <td className="td-mono">{item.numeroRegistro}</td>
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
                      setSelectedNurse(item);
                      setIsNurseModalOpen(true);
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

      {isNurseModalOpen && (
        <NurseModal
          nurse={selectedNurse}
          isMounted={isNurseModalOpen}
          setIsMounted={setIsNurseModalOpen}
          onClose={() => setSelectedNurse(undefined)}
        />
      )}
    </AppLayout>
  );
};

export default NursesPage;
