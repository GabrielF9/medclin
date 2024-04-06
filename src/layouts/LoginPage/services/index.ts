import api from '@/services/api';

export const handleLogin = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    api
      .post('/login', { email, senha: password })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
