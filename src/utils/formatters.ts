export const formatCPF = (cpf: string) => {
  const formattedCPF = cpf.replace(/\D/g, '');
  return formattedCPF.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
};

export const formatPhone = (phone: string) => {
  const formattedPhone = phone.replace(/\D/g, '');

  if (formattedPhone.length !== 11) {
    return formattedPhone;
  }

  return formattedPhone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR');
};
