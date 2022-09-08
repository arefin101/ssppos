import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_PAYMENT_METHODS,
    CREATE_PAYMENT_METHOD,
    GET_ADD_CUSTOMER_CREDIT_VIEW,
    CREATE_CUSTOMER_CREDIT,
    GET_INVOICE_LIST,
    MAKE_PAYMENT_VIEW,
    CREATE_SALE_PAYMENT,
    GET_CUSTOMER_DROPDOWN,
    GET_COLLECTIVE_PAYMENT_VIEW,
    CREATE_COLLECTIVE_PAYMENT,
    GET_PURCHASE_PAYMENT_VIEW,
    CREATE_PURCHASE_PAYMENT,
    GET_EXPENSE_PAYMENT_VIEW,
    CREATE_EXPENSE_PAYMENT,
    GET_PAYMENTS_BY_METHOD,
    GET_PAYMENT_METHOD_REPORT,
    PAYMENT_VERIFICATION,
    WITHDRAW_CUSTOMER_CREDIT,
    GET_AVAILABLE_CUSTOMER_CREDIT,
    GET_PAYMENT_METHOD_SUMMARY,
} from "./actionType";



export const paymentApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});


export const paymentApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getPaymentMethods = (history) => ({
    type: GET_PAYMENT_METHODS,
    payload:{ history },
});
  
export const createPaymentMethod = (data , history) => ({
    type: CREATE_PAYMENT_METHOD,
    payload: { data , history },
});

export const getAddCustomerCreditView = (history) => ({
    type: GET_ADD_CUSTOMER_CREDIT_VIEW,
    payload:{ history },
});
  
export const createCustomerCredit = (id, data, history) => ({
    type: CREATE_CUSTOMER_CREDIT,
    payload: { id, data, history },
});

export const getInvoiceList = (history) => ({
    type: GET_INVOICE_LIST,
    payload: { history },
});

export const makePaymentView = (history) => ({
    type: MAKE_PAYMENT_VIEW,
    payload: { history },
});

export const createSalePayment = (data, history) => ({
    type: CREATE_SALE_PAYMENT,
    payload: { data, history },
});

export const getCustomerDropdown = (history) => ({
    type: GET_CUSTOMER_DROPDOWN,
    payload: { history },
});

export const getCollectivePaymentView = ( customerId, history ) => ({
    type: GET_COLLECTIVE_PAYMENT_VIEW,
    payload: { customerId, history },
});

export const createCollectivePayment = ( data, history) => ({
    type: CREATE_COLLECTIVE_PAYMENT,
    payload: {data, history},
});

export const getPurchasePaymentView = (history) => ({
    type: GET_PURCHASE_PAYMENT_VIEW,
    payload: { history },
});

export const createPurchasePayment = ( data, history) => ({
    type: CREATE_PURCHASE_PAYMENT,
    payload: { data, history },
});

export const getExpensePaymentView = (history) => ({
    type: GET_EXPENSE_PAYMENT_VIEW,
    payload: { history },
});

export const createExpensePayment = ( data, history) => ({
    type: CREATE_EXPENSE_PAYMENT,
    payload: { data, history },
});

export const getPaymentMethodReport = (history) => ({
    type: GET_PAYMENT_METHOD_REPORT,
    payload: { history },
});

export const getPaymentMethodSummary = (history) => ({
    type: GET_PAYMENT_METHOD_SUMMARY,
    payload: { history },
});

export const getPaymentsByMethod = ( id, history) => ({
    type: GET_PAYMENTS_BY_METHOD,
    payload: { id, history },
});

export const paymentVerification = (data, history) => ({
    type: PAYMENT_VERIFICATION,
    payload: { data, history },
});
  
export const withdrawCustomerCredit = (id, data, history) => ({
    type: WITHDRAW_CUSTOMER_CREDIT,
    payload: { id, data, history },
});

export const getAvailableCustomerCredit = ( id, history) => ({
    type: GET_AVAILABLE_CUSTOMER_CREDIT,
    payload: { id, history },
});