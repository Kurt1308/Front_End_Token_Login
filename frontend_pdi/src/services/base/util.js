/**
 * Return message for HTTP status code
 * @param {number} status - HTTP status code
 * @returns {string} Message of network operation
 */
 function _getStatusMessage(status) {
  let message = ''
  switch (status) {
    case 200:
      message = 'All done. Request successfully executed'
      break
    case 204:
      message = 'Não possui conteúdo!'
      break
    case 201:
      message = 'Data successfully created'
      break
    case 400:
      message = 'Bad Request'
      break
    case 401:
      message = 'Need auth'
      break
    case 404:
      message = 'Not found'
      break
    case 503:
      message = 'Service unavailable. Try again later'
      break
    default:
      message = 'Something wrong. Client default error message'
      break
  }
  return message
}

function _getResponseErrorMessage(error) {
  if (error.response && error.response.data) return error.response.data.mensagem
  if (error.response && error.response.statusText) return error.response.statusText
  return error.message === 'Network Error' ? 'Oops! Network Error. Try again later' : error
}
/**
 * Create instance, which represent response object
 * @param {Object} [data] - custom data
 * @param {Object} [response] - axios response object
 * @param {String} [message] - custom message to display
 */
 export class ResponseWrapper {
  constructor(response, data = {}, message) {
    this.data = data;
    this.success = response.status >= 200 && response.status <= 299;
    this.status = response.status;
    this.statusMessage = _getStatusMessage(this.status);
    this.message = message || null;
  }
}
/**
 * Create instance, which represent error object
 * Essa classe, a partir de 29/12/2022, deixa de extender a classe Error (do Axios)
 * @param {Object} [error] - axios error object
 * @param {String} [message] - custom message to display
 */
export class ErrorWrapper {
  constructor(error, message) {
    this.success = error.response ? error.response.status : false;
    this.meta = error.response ? error.response.status : false;
    this.code = error.response ? error.response.status : false;
    this.status = error.response ? error.response.status : false;
    this.statusMessage = _getStatusMessage(this.status);
    this.message = message || _getResponseErrorMessage(error);
  }
}