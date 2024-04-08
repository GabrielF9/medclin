export interface Requisicao {
  idRequisicao: string;
  titulo: string;
  descricao: string;
  urgente: boolean;
  usuario: User;
}

export type ICreateRequisicao = Pick<
  Requisicao,
  'titulo' | 'descricao' | 'urgente'
> & { usuarioCpf?: string };
