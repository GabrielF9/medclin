import api from '@/services/api';
import storage from '@/utils/browser/storage';

export const handleLogin = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    api
      .post('/login', { email, senha: password })
      .then((response) => {
        const { token, ...user } = response.data;

        storage.local.setItem('token', token);
        storage.local.setItem('user', user);

        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
