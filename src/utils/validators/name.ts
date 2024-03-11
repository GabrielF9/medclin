const DENIED_NAMES_PREFIXES = /^(dr|dra|sr|sra|eng)$/;
const VALID_LETTERS =
  /^[a-záéíóúàâêôãõüçñöÁÉÍÓÚÀÂÊÔÃÕÜÇÑÖ][a-z\\'áéíóúàâêôãõüçñöÁÉÍÓÚÀÂÊÔÃÕÜÇÑÖ\s-]+$/gi;

export const isFullName = (name?: string, nameCount = 0) => {
  if (!name) return false;

  let hasSingleChars = false;

  const nameWithoutSpaces = name.trim();
  const splitedFullname = nameWithoutSpaces.split(/\s+/);

  const validSingleChairs = {
    e: true,
    E: true,
  };

  const fullNameWithoutSingleChars = splitedFullname
    .reduce((acc, value, index, arr) => {
      if (
        value.length === 1 &&
        !validSingleChairs[value as keyof typeof validSingleChairs]
      )
        hasSingleChars = true;
      if (index === 0 || index === arr.length - 1 || value.length > 1) {
        acc.push(value);
      }
      return acc;
    }, [] as string[])
    .join(' ');

  const hasNameLimitation = nameCount
    ? splitedFullname.length === nameCount
    : splitedFullname.length > 1;

  const hasDeniedPrefix = !!fullNameWithoutSingleChars.match(
    DENIED_NAMES_PREFIXES
  );
  const isAllLettersValid = !!fullNameWithoutSingleChars.match(VALID_LETTERS);

  const isValidFullName =
    hasNameLimitation &&
    !hasDeniedPrefix &&
    isAllLettersValid &&
    !hasSingleChars;

  return isValidFullName;
};
