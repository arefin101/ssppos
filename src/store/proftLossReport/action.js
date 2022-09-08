import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_PROFIT_BY_CUSTOMER,
    GET_PROFIT_BY_SALE_INVOICE,
    GET_PROFIT_BY_CUSTOMER_VIEW,
    GET_PROFIT_BY_DATE,
    GET_PROFIT_BY_PRODUCTS,
    GET_PROFIT_BY_PRODUCT_CATAGORIES,
    GET_PROFIT_BY_PRODUCT_MODELS,
} from "./actionType";



export const ApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const ApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getProfitBySaleInvoice = (history) => ({
    type: GET_PROFIT_BY_SALE_INVOICE,
    payload: { history },
});

export const getProfitByCustomer = (id, history) => ({
    type: GET_PROFIT_BY_CUSTOMER,
    payload: { id, history },
});

export const getProfitByCustomerView = (history) => ({
    type: GET_PROFIT_BY_CUSTOMER_VIEW,
    payload: { history },
});

export const getProfitByDate = (history) => ({
    type: GET_PROFIT_BY_DATE,
    payload: { history },
});

export const getProfitByProducts = (history) => ({
    type: GET_PROFIT_BY_PRODUCTS,
    payload: { history },
});

export const getProfitByProductModels = (history) => ({
    type: GET_PROFIT_BY_PRODUCT_MODELS,
    payload: { history },
});

export const getProfitByProductCatagories = (history) => ({
    type: GET_PROFIT_BY_PRODUCT_CATAGORIES,
    payload: { history },
});