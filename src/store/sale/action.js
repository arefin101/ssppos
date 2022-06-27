import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    IMEI_SCAN,
    GET_SALE_LIST,
    CREATE_SALE_TRANSACTION,
    GET_STORE_SALE_VIEW,
} from "./actionType";

  
export const saleApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const saleApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const imeiScan = (imei, history) => ({
    type: IMEI_SCAN,
    payload: { imei, history },
});

export const getSaleList = (history) => ({
    type: GET_SALE_LIST,
    payload: { history },
});

export const getStoreSaleView = (history) => ({
    type: GET_STORE_SALE_VIEW,
    payload: { history },
});

export const createSaleTransaction = (data, history) => ({
    type: CREATE_SALE_TRANSACTION,
    payload: {data, history}
});
