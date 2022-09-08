import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_AVERAGE_PURCHASE_PRICES,
    GET_PURCHASE_PRODUCT_LIST,
} from "./actionType";


export const averagePurchasePriceApiResponseSuccess = (actionType, data) => ({ 
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const averagePurchasePriceApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getAveragePurchasePrices = (history) => ({
    type: GET_AVERAGE_PURCHASE_PRICES,
    payload:{history}
});

export const getPurchaseProductList = (sku, history) => ({
    type: GET_PURCHASE_PRODUCT_LIST,
    payload:{sku, history}
});