import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_COMMISSION_BY_SALE_INVOICE_FP,
    GET_COMMISSION_BY_CUSTOMER,
    GET_SALES_DUE_FP,
    GET_COMISSION_BY_RETURN_INVOICE_FP
} from "./actionType";



export const FPApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const FPApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getCommSaleInvoiceFP = (data, history) => ({
    type: GET_COMMISSION_BY_SALE_INVOICE_FP,
    payload:{data, history}
});

export const getSalesDueFPView = (history) => ({
    type: GET_SALES_DUE_FP,
    payload: { history },
});

export const getComissionByReturnInvoiceFPView = (history) => ({
    type: GET_COMISSION_BY_RETURN_INVOICE_FP,
    payload: { history },
});

export const getCommissionByCustomer = (history) => ({
    type: GET_COMMISSION_BY_CUSTOMER,
    payload: { history },
});
