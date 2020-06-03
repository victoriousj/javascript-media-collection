const API_SERVER = process.env.REACT_APP_API || 'http://localhost:3001';

export async function getData(method, endpoint, body) {
  try {
    const response = await fetch(`${API_SERVER}/${endpoint}`, {
      method,
      body: body && JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}