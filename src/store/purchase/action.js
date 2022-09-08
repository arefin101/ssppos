import {
    GET_PURCHASE,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    CREATE_PURCHASE,
    GET_STORE_PURCHASE_VIEW,
    GET_PURCHASE_INVOICE,
    PURCHASE_TOGGLE_LOCK,
    PURCHASE_VERIFICATION,
    GET_PURCHASE_RETURN_LIST,
    GET_PURCHASE_RETURN_VARIATIONS,
    PURCHASE_RETURN_VERIFICATION,
    CREATE_PURCHASE_RETURN,
  } from "./actionType";

export const puchaseApiResponseSuccess = (actionType, data) => ({ 
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const purchaseApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getPurchases= (history) => ({
    type: GET_PURCHASE,
    payload:{history}
});

export const getStorePurchaseView= (history) => ({
    type: GET_STORE_PURCHASE_VIEW,
    payload:{history}
});

export const createPurchase = (data, history) => ({
    type: CREATE_PURCHASE,
    payload: {data, history}
});

export const getPurchaseInvoice = (id, history) => ({
    type: GET_PURCHASE_INVOICE,
    payload: {id, history},
});

export const purchaseToggleLock = (id, history) => ({
    type: PURCHASE_TOGGLE_LOCK,
    payload: {id, history},
});

export const purchaseVerification = (data, history) => ({
    type: PURCHASE_VERIFICATION,
    payload: {data, history},
});

export const getPurchaseReturnList= (history) => ({
    type: GET_PURCHASE_RETURN_LIST,
    payload:{history}
});

export const getPurchaseReturnVariationsById = (id, history) => ({
    type: GET_PURCHASE_RETURN_VARIATIONS,
    payload: {id, history},
});

export const purchaseReturnVerification = (data, history) => ({
    type: PURCHASE_RETURN_VERIFICATION,
    payload: {data, history},
});

export const createPurchaseReturn = (data, history) => ({
    type: CREATE_PURCHASE_RETURN,
    payload: {data, history},
});