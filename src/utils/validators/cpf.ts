export const isValidCPF = (cpf: string): boolean => {
  if (!cpf) return false;

  const cpfFormatted = cpf.replace(/[^\d]/g, '');

  if (cpfFormatted.length !== 11) return false;

  const invalidCPFs = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ];

  if (invalidCPFs.includes(cpfFormatted)) return false;

  let sum = 0;
  let rest = 0;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpfFormatted.substring(i - 1, i), 10) * (11 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;

  if (rest !== parseInt(cpfFormatted.substring(9, 10), 10)) return false;

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpfFormatted.substring(i - 1, i), 10) * (12 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;

  if (rest !== parseInt(cpfFormatted.substring(10, 11), 10)) return false;

  return true;
};
