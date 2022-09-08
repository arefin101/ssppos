import axios from "axios";
import config from "../config";


axios.defaults.baseURL = config.API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/json";

axios.interceptors.response.use(
    function (response) {
        return response.data ? response.data : response;
    },
    async function (error) {

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
        default:
            message = (error.response.data.errors) ? error.response.data.errors : error.response.data.message;
            statusCode = error.response.status ? statusCode= error.response.status:""
        }
        return Promise.reject([message,statusCode]);
    }
);

const setAuthorization = (token) => {
    axios.defaults.headers.common["Authorization"] = "Bearer "+ token;
};

class APIClient {

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

    create = (url, data) => {

        setAuthorization(localStorage.getItem('authToken'));

        return axios.post(url, data);
    };

    update = (url, data) => {

        setAuthorization(localStorage.getItem('authToken'));

        return axios.put(url, data);
    };

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