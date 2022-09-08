import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_SALESMAN_DROPDOWN,
    GET_COMMISSION_BY_SALE_INVOICE_TP,
    GET_COMM_BY_RETURN_INVOICE_TP,
    GET_SALES_DUE_TP,
    GET_COMMISSION_SUMMARY,
    SALES_DUE_SUMMARY,
    GET_COMMISSION_BY_CUSTOMER_TP,
} from "./actionType";

const INIT_STATE = {
    commByCustomerTP: [],
    salesmanDropdown: [],
    commBySaleInvoice: [],
    commByReturnInvoice: [],
    salesDue: [],
    commissionSummary: [],
    salesDueSummary: [],
    response: [],
    error: {},
};

const ReportTP = (state = INIT_STATE, action) => {
    
    switch (action.type) {

        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {

                case GET_SALESMAN_DROPDOWN:
                    return {
                        ...state,
                        salesmanDropdown: action.payload.data,
                    };
                
                case GET_COMMISSION_SUMMARY:
                    return {
                        ...state,
                        commissionSummary: action.payload.data,
                    };

                case SALES_DUE_SUMMARY:
                    return {
                        ...state,
                        salesDueSummary: action.payload.data,
                    };

                case GET_COMMISSION_BY_CUSTOMER_TP:
                    return {
                        ...state,
                        commByCustomerTP: action.payload.data,
                    };

                case GET_COMMISSION_BY_SALE_INVOICE_TP:
                    return {
                        ...state,
                        commBySaleInvoice: action.payload.data,
                    };

                case GET_COMM_BY_RETURN_INVOICE_TP:
                    return {
                        ...state,
                        commByReturnInvoice: action.payload.data,
                    };

                case GET_SALES_DUE_TP:
                    return {
                        ...state,
                        salesDue: action.payload.data,
                    };

                default:
                    return { ...state };
            }
        
        case API_RESPONSE_ERROR:

            switch (action.payload.actionType) {

                case GET_SALESMAN_DROPDOWN:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_COMMISSION_BY_SALE_INVOICE_TP:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                    
                case GET_COMM_BY_RETURN_INVOICE_TP:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_COMMISSION_SUMMARY:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_SALES_DUE_TP:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case SALES_DUE_SUMMARY:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_COMMISSION_BY_CUSTOMER_TP:
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
  
  export default ReportTP;
  