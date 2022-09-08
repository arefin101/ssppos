import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_POOL_HISTORY,
    DELETE_POOL_HISTORY,
    UPDATE_POOL_HISTORY,
    ADD_POOL,
    WITHDRAW_POOL
} from "./actionType";



export const poolApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const poolApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getPoolHistory = (history) => ({
    type: GET_POOL_HISTORY,
    payload:{history},
});

export const deletePoolHistory = (id, history) => ({
    type: DELETE_POOL_HISTORY,
    payload:{id, history},
});

export const updatePoolHistory = (id, data, history) => ({
    type: UPDATE_POOL_HISTORY,
    payload:{id, data, history},
});

export const addPool = (history, data) => ({
    type: ADD_POOL,
    payload:{history, data},
});

export const withdrawPool = (history, data) => ({
    type: WITHDRAW_POOL,
    payload:{history, data},
});