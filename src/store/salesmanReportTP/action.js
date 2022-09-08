import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_SALESMAN_DROPDOWN,
    GET_COMMISSION_BY_SALE_INVOICE_TP,
    GET_SALES_DUE_TP,
    GET_COMM_BY_RETURN_INVOICE_TP,
    GET_COMMISSION_SUMMARY,
    SALES_DUE_SUMMARY,
    GET_COMMISSION_BY_CUSTOMER_TP,
} from "./actionType";



export const TPApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const TPApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getSalesmanDropdown = (history) => ({
    type: GET_SALESMAN_DROPDOWN,
    payload:{history}
});

export const getCommSaleInvoiceTP = (id, data, history) => ({
    type: GET_COMMISSION_BY_SALE_INVOICE_TP,
    payload:{id, data, history}
});

export const getSalesDueTp = (id, history) => ({
    type: GET_SALES_DUE_TP,
    payload:{id, history}
});

export const getCommByReturnInvoiceTp = (id, history) => ({
    type: GET_COMM_BY_RETURN_INVOICE_TP,
    payload:{id, history}
});

export const getCommissionSummary = (history) => ({
    type: GET_COMMISSION_SUMMARY,
    payload:{history}
});

export const getSalesDueSummary = (history) => ({
    type: SALES_DUE_SUMMARY,
    payload:{history}
});

export const getCommissionByCustomerTp = (data, history) => ({
    type: GET_COMMISSION_BY_CUSTOMER_TP,
    payload: { data, history },
});
