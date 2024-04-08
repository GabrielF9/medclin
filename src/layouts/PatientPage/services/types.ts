export interface Paciente {
    cpf: string;
    nome: string;
    telefone: string;
    email: string;
    dataNascimento: string;
}

export type ICreatePaciente = Paciente;