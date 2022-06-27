import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_AVERAGE_PURCHASE_PRICES,
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