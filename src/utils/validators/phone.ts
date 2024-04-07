export const isValidPhone = (phone: string): boolean => {
  if (!phone) return false;

  const phoneFormatted = phone.replace(/[^\d]/g, '');

  if (phoneFormatted.length < 10 || phoneFormatted.length > 11) return false;

  return true;
};
