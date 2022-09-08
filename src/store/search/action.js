import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    IMEI_SEARCH,
} from "./actionType";



export const searchApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const searchApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const imeiSearch = (imei, history) => ({
    type: IMEI_SEARCH,
    payload:{imei, history}
});