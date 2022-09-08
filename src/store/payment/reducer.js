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

const INIT_STATE = {
    response: [],
    invoiceList: [],
    purchasePaymentList: [],
    makePaymentView: [],
    createSalePaymentResponse: [],
    createSalePaymentError: [],
    makePaymentViewError: [],
    invoiceListError: {},
    error: {},
    paymentMethods: [],
    customerCreditView: [],
    customers: [],
    createCollectivePaymentResponse: [],
    createPurchasePaymentResponse: [],
    collectivePaymentError: [],
    purchasePaymentError: [],
    expensePaymentView: [],
    expensePaymentResponse: [],
    expensePaymentError: [],
    paymentMethodReport: [],
    paymentMethodSummary: [],
    paymentsByMethod: [],
    verifyResponse: [],
    verifyError: [],
    availableCredit: {},
};

const Payment = (state = INIT_STATE, action) => {
    
    switch (action.type) {

        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {

                case GET_PAYMENT_METHODS:
                    return {
                        ...state,
                        paymentMethods: action.payload.data,
                    };

                case CREATE_PAYMENT_METHOD:
                    return {
                        ...state,
                        response: action.payload.data,
                    };
                
                case GET_ADD_CUSTOMER_CREDIT_VIEW:
                    return {
                        ...state,
                        customerCreditView: action.payload.data,
                    };

                case CREATE_CUSTOMER_CREDIT:
                    return {
                        ...state,
                        response: action.payload.data,
                    };

                case WITHDRAW_CUSTOMER_CREDIT:
                    return {
                        ...state,
                        response: action.payload.data,
                    };
                    
                case GET_INVOICE_LIST:
                    return {
                        ...state,
                        invoiceList: action.payload.data,
                    };

                case MAKE_PAYMENT_VIEW:
                    return {
                        ...state,
                        makePaymentView: action.payload.data,
                    };

                case CREATE_SALE_PAYMENT: 
                    return {
                        ...state,
                        createSalePaymentResponse: action.payload.data,
                    };

                case GET_CUSTOMER_DROPDOWN: 
                    return {
                        ...state,
                        customers: action.payload.data,
                    };

                case GET_COLLECTIVE_PAYMENT_VIEW: 
                    return {
                        ...state,
                        response: action.payload.data,
                    };

                case CREATE_COLLECTIVE_PAYMENT: 
                    return {
                        ...state,
                        createCollectivePaymentResponse: action.payload.data,
                    };

                case GET_PURCHASE_PAYMENT_VIEW: 
                    return {
                        ...state,
                        purchasePaymentList: action.payload.data,
                    };

                case CREATE_PURCHASE_PAYMENT: 
                    return {
                        ...state,
                        createPurchasePaymentResponse: action.payload.data,
                    };

                case GET_EXPENSE_PAYMENT_VIEW: 
                    return {
                        ...state,
                        expensePaymentView: action.payload.data,
                    };

                case CREATE_EXPENSE_PAYMENT: 
                    return {
                        ...state,
                        expensePaymentResponse: action.payload.data,
                    };

                case GET_PAYMENT_METHOD_REPORT: 
                    return {
                        ...state,
                        paymentMethodReport: action.payload.data,
                    };

                case GET_PAYMENT_METHOD_SUMMARY: 
                    return {
                        ...state,
                        paymentMethodSummary: action.payload.data,
                    };


                case GET_PAYMENTS_BY_METHOD: 
                    return {
                        ...state,
                        paymentsByMethod: action.payload.data,
                    };

                case PAYMENT_VERIFICATION: 
                    return {
                        ...state,
                        verifyResponse: action.payload.data,
                    };

                case GET_AVAILABLE_CUSTOMER_CREDIT: 
                    return {
                        ...state,
                        availableCredit: action.payload.data,
                    };
            
                default:
                    return { ...state };
            }
        
        case API_RESPONSE_ERROR:

            switch (action.payload.actionType) {

                case GET_PAYMENT_METHODS:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case CREATE_PAYMENT_METHOD:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_ADD_CUSTOMER_CREDIT_VIEW:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case CREATE_CUSTOMER_CREDIT:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case WITHDRAW_CUSTOMER_CREDIT:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
    
                case GET_INVOICE_LIST:
                    return {
                        ...state,
                        invoiceListError: action.payload.error,
                    };

                case MAKE_PAYMENT_VIEW:
                    return {
                        ...state,
                        makePaymentViewError: action.payload.data,
                    };
                
                case CREATE_SALE_PAYMENT: 
                    return {
                        ...state,
                        createSalePaymentError: action.payload.error,
                    } ;

                case GET_CUSTOMER_DROPDOWN: 
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_COLLECTIVE_PAYMENT_VIEW: 
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case CREATE_COLLECTIVE_PAYMENT: 
                    return {
                        ...state,
                        collectivePaymentError: action.payload.error,
                    };

                case GET_PURCHASE_PAYMENT_VIEW: 
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case CREATE_PURCHASE_PAYMENT: 
                    return {
                        ...state,
                        purchasePaymentError: action.payload.error,
                    };

                case GET_EXPENSE_PAYMENT_VIEW: 
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case CREATE_EXPENSE_PAYMENT: 
                    return {
                        ...state,
                        expensePaymentError: action.payload.error,
                    };

                case GET_PAYMENT_METHOD_REPORT: 
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_PAYMENT_METHOD_SUMMARY: 
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_PAYMENTS_BY_METHOD: 
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case PAYMENT_VERIFICATION: 
                    return {
                        ...state,
                        verifyError: action.payload.error,
                    };

                case GET_AVAILABLE_CUSTOMER_CREDIT: 
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                default:
                    return { ...state };

            }

        default:
            return { ...state };
        }

};
  
export default Payment;
  