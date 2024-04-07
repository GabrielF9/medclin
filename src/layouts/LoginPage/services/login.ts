import api from '@/services/api';
import storage from '@/utils/browser/storage';

export const handleLogin = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    api
      .post('/login', { email, senha: password })
      .then((response) => {
        const { token } = response.data;

        storage.local.setItem('token', token);

        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
