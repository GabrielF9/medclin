export interface Secretaria {
  idSecretaria: string;
  ala: string;
  usuario: User;
}

export type ICreateSecretaria = Pick<Secretaria, 'ala'> & User;
