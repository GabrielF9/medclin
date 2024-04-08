import api from '@/services/api';

export const handleGetWorkSchedule = async () => {
  return new Promise((resolve, reject) => {
    api
      .get('/escala')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
