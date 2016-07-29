export const checkStatus = function (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  let error;

  if (response.status >= 400 && response.status < 500) {
    error = new Error('[Connection error] ' + response.statusText);
  }
  else if (response.status >= 500 && response.status < 600) {
    error = new Error('[Server error] ' + response.statusText);
  }
  else {
    error = new Error('[Error] ' + response.statusText);
  }

  error.response = response;
  throw error;
};

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export const makeFetchInit = function (method = 'POST', headers = defaultHeaders, data = {}) {
  if (method === 'GET') {
    return {
      method,
      headers
    };
  }

  return {
    method,
    headers,
    body: JSON.stringify(data)
  };
};

export const dragWindow = function () {
  overwolf.windows.getCurrentWindow(function(result) {
    if (result.status === 'success') {
      overwolf.windows.dragMove(result.window.id);
    }
  });
};
