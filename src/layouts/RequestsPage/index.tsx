import { AlertTriangle, Edit, Plus, Trash2 } from 'react-feather';

import Button from '@/components/Button';
import { formatCPF } from '@/utils/formatters';

import AppLayout from '../AppLayout';
import AppLayoutSkeleton from '../AppLayout/AppLayoutSkeleton';
import DeleteRequestModal from './components/DeleteRequestModal';
import RequestModal from './components/RequestModal';
import useRequestsPage from './useRequestsPage';

const RequestsPage = () => {
  const {
    data,
    isRequestModalOpen,
    setIsRequestModalOpen,
    selectedRequest,
    setSelectedRequest,
    isDeleteRequestModalOpen,
    setIsDeleteRequestModalOpen,
    handleData,
  } = useRequestsPage();

  if (!data) {
    return <AppLayoutSkeleton title="Requisições" />;
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-primary-500">Requisições</h1>

      <Button className="mt-3" onClick={() => setIsRequestModalOpen(true)}>
        <Plus width={20} height={20} />
        <span>Nova</span>
      </Button>

      <div className="mt-3 flex-1 overflow-y-scroll">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Urgência</th>
              <th>Criada por</th>
              <th aria-hidden />
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.idRequisicao}>
                <td>{item.titulo}</td>
                <td>{item.descricao}</td>
                <td>
                  {item.urgente && (
                    <AlertTriangle
                      height={20}
                      width={20}
                      className="text-red-500"
                    />
                  )}
                </td>
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
                  <div className="flex gap-2">
                    <button
                      aria-label="Editar"
                      type="button"
                      className="text-primary-500 duration-100 hover:text-primary-600"
                      onClick={() => {
                        setSelectedRequest(item);
                        setIsRequestModalOpen(true);
                      }}
                    >
                      <Edit width={20} height={20} />
                    </button>

                    <button
                      aria-label="Editar"
                      type="button"
                      className="text-red-500 duration-100 hover:text-red-600"
                      onClick={() => {
                        setSelectedRequest(item);
                        setIsDeleteRequestModalOpen(true);
                      }}
                    >
                      <Trash2 width={20} height={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isRequestModalOpen && (
        <RequestModal
          request={selectedRequest}
          isMounted={isRequestModalOpen}
          setIsMounted={setIsRequestModalOpen}
          onClose={() => setSelectedRequest(undefined)}
        />
      )}

      <DeleteRequestModal
        request={selectedRequest}
        isMounted={isDeleteRequestModalOpen}
        setIsMounted={setIsDeleteRequestModalOpen}
        onClose={() => {
          setSelectedRequest(undefined);
          handleData();
        }}
      />
    </AppLayout>
  );
};

export default RequestsPage;
