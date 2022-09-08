import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_USERS,
    GET_USER_BY_ID,
    ADD_USER,
    ADD_ROLE,
    GET_ROLE_BY_ID,
    UPDATE_USER_BY_ID,
    GET_CUA_LIST, 
    CUA_ASSIGN,
    GET_CUA_ASSIGN_VIEW,
} from "./actionType";
  

export const userApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const userApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getUsers = (history) => ({
    type: GET_USERS,
    payload: { history },
});

export const getUserById = (id , history) => ({
    type: GET_USER_BY_ID,
    payload: { id, history }
});

export const updateUserById = (id, data, history) => ({
    type: UPDATE_USER_BY_ID,
    payload: { id, data, history }
});

export const addUser = (user, history) => ({
    type: ADD_USER,
    payload: { user, history },
});

export const getRoleById= (id, history) => ({
    type: GET_ROLE_BY_ID,
    payload: {id, history}
});

export const addRole = (data, history) => ({
    type: ADD_ROLE,
    payload: { data, history }
});

export const getCuaList = (history) => ({
    type: GET_CUA_LIST,
    payload: { history }
});

export const cuaAssign = (data, history) => ({
    type: CUA_ASSIGN,
    payload: { data, history },
});

export const getCuaAssignView = (history) => ({
    type: GET_CUA_ASSIGN_VIEW,
    payload: { history },
});