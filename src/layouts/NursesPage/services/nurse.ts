import api from '@/services/api';

export const handleGetNurses = async () => {
  return new Promise((resolve, reject) => {
    api
      .get('/enfermeiros')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
