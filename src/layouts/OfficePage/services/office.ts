import api from '@/services/api';

export const handleGetOffices = async () => {
  return new Promise((resolve, reject) => {
    api
      .get('/secretaria')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
