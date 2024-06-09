import server from '$lib/api';

export async function uploadSelfie(formData: FormData) {
  const response = await server.post('/selfies/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  console.log('response: ', response);
  return response;
}
