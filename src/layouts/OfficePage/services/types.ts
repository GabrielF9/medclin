export interface Secretaria {
  idSecretaria: number;
  ala: string;
  usuario: User;
}

export type ICreateSecretaria = Pick<Secretaria, 'ala'> & User;
