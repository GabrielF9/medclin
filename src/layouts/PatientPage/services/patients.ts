import api from '@/services/api';

export const handleGetPatients = async () => {
  return new Promise((resolve, reject) => {
    api
      .get('/paciente')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
