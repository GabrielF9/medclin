import api from '@/services/api';

export const handleGetRequests = async () => {
  return new Promise((resolve, reject) => {
    api
      .get('/requisicao')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
