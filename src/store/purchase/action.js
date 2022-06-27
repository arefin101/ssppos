import {
    GET_PURCHASE,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    CREATE_PURCHASE,
    GET_STORE_PURCHASE_VIEW,
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
