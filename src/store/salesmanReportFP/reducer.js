import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_COMMISSION_BY_SALE_INVOICE_FP,
    GET_COMMISSION_BY_CUSTOMER,
    GET_SALES_DUE_FP,
    GET_COMISSION_BY_RETURN_INVOICE_FP
} from "./actionType";

const INIT_STATE = {
    commBySaleInvoice: [],
    commByCustomerFP: [],
    response: [],
    salesDueFP:[],
    comissionbyReturnInvoice:[],
    error: {},
}

const ReportFP = (state = INIT_STATE, action) => {
    
    switch (action.type) {

        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {

                case GET_COMMISSION_BY_SALE_INVOICE_FP:
                    return {
                        ...state,
                        commBySaleInvoice: action.payload.data,
                    };

                case GET_SALES_DUE_FP:
                    return {
                        ...state,
                        salesDueFP: action.payload.data,
                    };

                case GET_COMMISSION_BY_CUSTOMER:
                    return {
                        ...state,
                        commByCustomerFP: action.payload.data,
                    };

                case GET_COMISSION_BY_RETURN_INVOICE_FP:
                    return {
                        ...state,
                        comissionbyReturnInvoice: action.payload.data,
                    };

                default:
                    return { ...state };
            }
        
        case API_RESPONSE_ERROR:

            switch (action.payload.actionType) {

                case GET_COMMISSION_BY_SALE_INVOICE_FP:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_SALES_DUE_FP:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                    
                case GET_COMISSION_BY_RETURN_INVOICE_FP:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
    
                case GET_COMMISSION_BY_CUSTOMER:
                    return {
                        ...state,
                        error: action.payload.data,
                    };

                default:
                    return { ...state };
            }

        default:
            return { ...state };
        }

};
  
  export default ReportFP;
  