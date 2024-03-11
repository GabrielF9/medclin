export interface IPasswordRules {
  length?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  digit?: boolean;
  special?: boolean;
}

export const isValidPassword = (password: string) => {
  if (!password) return false;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

  return passwordRegex.test(password);
};

export const validatePasswordRules = (password: string) => {
  const validRules: IPasswordRules = {
    length: true,
    uppercase: true,
    lowercase: true,
    digit: true,
    special: true,
  };

  if (password.length < 8) {
    validRules.length = false;
  }
  if (!/(?=.*[a-z])/.test(password)) {
    validRules.lowercase = false;
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    validRules.uppercase = false;
  }
  if (!/(?=.*\d)/.test(password)) {
    validRules.digit = false;
  }
  if (!/(?=.*[^\w\s])/.test(password)) {
    validRules.special = false;
  }

  return validRules;
};
