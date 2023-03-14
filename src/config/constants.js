export const STORAGE_URL = `${process.env.REACT_APP_BASE_PATH}/storage/`;

export const LOG_ENDPOINTS = {
  oauth: `${process.env.REACT_APP_BASE_PATH}/oauth/token`,
  oauthCliente: `${process.env.REACT_APP_BASE_PATH}/oauth-cliente/token`,
  authinfo: `${process.env.REACT_APP_BASE_PATH}/api/authinfo`,
  deleteToken: `${process.env.REACT_APP_BASE_PATH}/api/users/logout`
} 