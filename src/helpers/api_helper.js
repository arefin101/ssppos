import axios from "axios";
import config from "../config";

// default
axios.defaults.baseURL = config.API_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/json";
// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    //console.log(response)
    return response.data ? response.data : response;
  },
  async function (error) {
    //console.log(error.response)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    
    let message;
    let statusCode;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        statusCode= error.response.status
        break;
      case 401:
        message = error.response.data.message;
        statusCode= error.response.status
        break;
    //   case 404:
    //     message = "Sorry! the data you are looking for could not be found";
    //     break;
    //   case 422:
    //     message = error.response.data.message;
    //     break;
      default:
        message = (error.response.data.errors) ? error.response.data.errors : error.response.data.message;
        statusCode = error.response.status ? statusCode= error.response.status:""
    }
    return Promise.reject([message,statusCode]);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer "+ token;
};

class APIClient {
  /**
   * Fetches data from given url
   */

   get = (url, params ) => {
    
    setAuthorization(localStorage.getItem('authToken'));

    let response;

    let paramKeys = [];

    if(params){
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key])
        return paramKeys;
    });
      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
        
        response = axios.get(`${url}`, params);
    }
    return response;
  }
  /**
   * post given data to url
   */
  create = (url, data) => {

    setAuthorization(localStorage.getItem('authToken'));

    return axios.post(url, data);
  };
  /**
   * Updates data
   */
  update = (url, data) => {

    setAuthorization(localStorage.getItem('authToken'));

    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url, config) => {
    
    setAuthorization(localStorage.getItem('authToken'));

    return axios.delete(url, { ...config });
  };
}
const getLoggedinUser = () => {
  const user = localStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };