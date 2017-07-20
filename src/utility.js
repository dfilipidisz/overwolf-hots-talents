const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const initFetch = function (data = {}, method = 'POST', headers = defaultHeaders ) {
  if (data.token) {
    headers = Object.assign({}, headers, { 'Authorization': `Bearer ${data.token}` });
    data = Object.assign({}, data, { token: undefined });
  }

  if (method === 'GET') {
    return {
      method,
      headers,
    };
  }

  return {
    method,
    headers,
    body: JSON.stringify(data),
  };
};

export const checkResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  let error;

  if (response.status >= 400 && response.status < 500) {
    error = new Error('Connection error.');
  } else if (response.status >= 500 && response.status < 600) {
    error = new Error('Server error.');
  } else {
    error = new Error('Error.');
  }

  error.code = response.status;
  error.response = response;
  throw error;
};
