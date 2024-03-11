export const handleInitials = (name?: string | null): string => {
  if (!name) return '';

  const [firstName, lastName] = name.split(' ');

  if (firstName)
    return lastName ? `${firstName[0]}${lastName[0]}` : `${firstName[0]}`;

  return '';
};

export const handleUserName = (name?: string | null): string => {
  if (!name) return '';

  const [firstName, lastName] = name.split(' ');

  if (firstName) return lastName ? `${firstName} ${lastName}` : `${firstName}`;

  return '';
};
