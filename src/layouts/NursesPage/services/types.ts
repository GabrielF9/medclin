export interface Enfermeiro {
  idEnfermeiro: string;
  especialidade: string;
  numeroRegistro: string;
  usuario: User;
}

export type EnfermeiroAttributes = {
  especialidade: string;
  numeroRegistro: string;
};

export type ICreateEnfermeiro = Pick<Enfermeiro, keyof EnfermeiroAttributes> &
  User;
