export interface EscalaTrabalho {
  idEscalaTrabalho: string;
  horaInicio: string;
  horaFim: string;
  dia: string;
  usuario: User;
}

export type ICreateEscalaTrabalho = Pick<
  EscalaTrabalho,
  'horaInicio' | 'dia' | 'horaFim'
> & { cpf: string };
