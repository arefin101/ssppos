import {
    GET_ROLE,
    GET_PERMISSION,
    ASSIGN_PERMISSION,
    CREATE_ROLE,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_ROLE_PERMISSION_SELECT,
} from "./actionType";


export const roleApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});


export const roleApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});


export const getRoles= (history) => ({
    type: GET_ROLE,
    payload:{history}
});


export const getPermission= (id,history) => ({
    type: GET_PERMISSION,
    payload: {id, history}
});


export const getRolePermission= () => ({
    type: GET_ROLE_PERMISSION_SELECT,
});


export const assignPermissions= (data , history) => ({
    type: ASSIGN_PERMISSION,
    payload: {data, history}
});


export const createRole = (role , history) => ({
    type: CREATE_ROLE,
    payload: { role, history}
})

