/**
 * Axios Request Wrapper
 * ---------------------
 *
 * @author  Hednei Carlos Marangoni Junior
 *
 */

import axios from 'axios'

/**
 * Create an Axios Client with defaults
 */

const client = axios.create({
  baseURL: 'https://run.mocky.io/v3/',
});

/**
 * Request Wrapper with default success/error actions
 */
const request = (options:any) => {
  const onSuccess = (response:any) => {
    return response.data;
  }

  const onError = (error:any) => {
    return Promise.reject(error);
  }

  return client(options)
            .then(onSuccess)
            .catch(onError);
}

export default request;