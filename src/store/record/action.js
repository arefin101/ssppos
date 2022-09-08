import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_CASH_IN_RECORDS,
    GET_CASH_OUT_RECORDS,
    GET_TRANSACTION_RECORDS,
    GET_VERIFICATION_RECORD,
    GET_USER_LOG,
} from "./actionType";



export const recordApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const recordApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getTransactionRecords = (history) => ({
    type: GET_TRANSACTION_RECORDS,
    payload:{history}
});

export const getCashInRecords = (history) => ({
    type: GET_CASH_IN_RECORDS,
    payload:{history}
});

export const getCashOutRecords = (history) => ({
    type: GET_CASH_OUT_RECORDS,
    payload:{history}
});

export const getVerificationRecord = (history) => ({
    type: GET_VERIFICATION_RECORD,
    payload: {history}
})

export const getUserLog = (history) => ({
    type: GET_USER_LOG,
    payload: {history}
})