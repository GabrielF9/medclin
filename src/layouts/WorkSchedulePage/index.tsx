import { Plus, Trash2 } from 'react-feather';

import Button from '@/components/Button';
import { formatCPF, formatDate } from '@/utils/formatters';

import AppLayout from '../AppLayout';
import AppLayoutSkeleton from '../AppLayout/AppLayoutSkeleton';
import DeleteWorkScheduleModal from './components/DeleteWorkScheduleModal';
import WorkScheduleModal from './components/WorkScheduleModal';
import useWorkSchedulePage from './useWorkSchedulePage';

const WorkSchedulePage = () => {
  const {
    data,
    isWorkScheduleModalOpen,
    setIsWorkScheduleModalOpen,
    selectedWorkSchedule,
    setSelectedWorkSchedule,
    isDeleteWorkScheduleModalOpen,
    setIsDeleteWorkScheduleModalOpen,
    handleData,
  } = useWorkSchedulePage();

  if (!data) {
    return <AppLayoutSkeleton title="Escala" />;
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-primary-500">Escala</h1>

      <Button className="mt-3" onClick={() => setIsWorkScheduleModalOpen(true)}>
        <Plus width={20} height={20} />
        <span>Nova</span>
      </Button>

      <div className="mt-3 flex-1 overflow-y-scroll">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th>Dia</th>
              <th>Hora Início</th>
              <th>Hora Fim</th>
              <th>Funcionário</th>
              <th aria-hidden />
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.idEscalaTrabalho}>
                <td className="td-mono">{formatDate(item.dia)}</td>
                <td className="td-mono">{item.horaInicio}</td>
                <td>{item.horaFim}</td>
                <td>
                  {item.usuario && (
                    <>
                      <p>
                        {item.usuario.nome} {item.usuario.sobrenome}
                      </p>
                      <p className="td-mono text-xs">
                        {formatCPF(item.usuario.cpf)}
                      </p>
                    </>
                  )}
                </td>
                <td>
                  <button
                    aria-label="Editar"
                    type="button"
                    className="text-red-500 duration-100 hover:text-red-600"
                    onClick={() => {
                      setSelectedWorkSchedule(item);
                      setIsDeleteWorkScheduleModalOpen(true);
                    }}
                  >
                    <Trash2 width={20} height={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isWorkScheduleModalOpen && (
        <WorkScheduleModal
          isMounted={isWorkScheduleModalOpen}
          setIsMounted={setIsWorkScheduleModalOpen}
          onClose={() => setSelectedWorkSchedule(undefined)}
        />
      )}

      <DeleteWorkScheduleModal
        workSchedule={selectedWorkSchedule}
        isMounted={isDeleteWorkScheduleModalOpen}
        setIsMounted={setIsDeleteWorkScheduleModalOpen}
        onClose={() => {
          setSelectedWorkSchedule(undefined);
          handleData();
        }}
      />
    </AppLayout>
  );
};

export default WorkSchedulePage;
