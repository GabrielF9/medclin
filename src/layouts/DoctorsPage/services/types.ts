export interface Medico {
  idMedico: number;
  especialidade: string;
  crm: string;
  usuario: User;
}

export type MedicoAttributes = {
  especialidade: string;
  crm: string;
};

export type ICreateMedico = Pick<Medico, keyof MedicoAttributes> & User;
