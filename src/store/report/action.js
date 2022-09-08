import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_CAS_INDEX,
    GET_CAS_INDEX_VIEW,
    GET_SAS_INDEX,
    GET_SAS_INDEX_VIEW,
    GET_SPR_INDEX,
    GET_PPR_INDEX,
    GET_EPR_INDEX,
    GET_VERIFICATION_REPORT_LIST,
} from "./actionType";



export const reportApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const reportApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getCasIndex = (id, history) => ({
    type: GET_CAS_INDEX,
    payload: { id, history },
});

export const getCasIndexView = (history) => ({
    type: GET_CAS_INDEX_VIEW,
    payload:{history},
});

export const getSasIndex = (id, history) => ({
    type: GET_SAS_INDEX,
    payload: { id, history },
});

export const getSasIndexView = (history) => ({
    type: GET_SAS_INDEX_VIEW,
    payload:{history},
});

export const getSprIndex = (history) => ({
    type: GET_SPR_INDEX,
    payload: { history },
});

export const getPprIndex = (history) => ({
    type: GET_PPR_INDEX,
    payload: { history },
});

export const getEprIndex = (history) => ({
    type: GET_EPR_INDEX,
    payload: { history },
});

export const getVerificationReportList = (history) => ({
    type: GET_VERIFICATION_REPORT_LIST,
    payload: { history },
});