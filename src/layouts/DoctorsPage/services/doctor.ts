import api from '@/services/api';

export const handleGetDoctors = async () => {
  return new Promise((resolve, reject) => {
    api
      .get('/medicos')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
