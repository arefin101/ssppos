import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    IMEI_SCAN,
    GET_SALE_LIST,
    CREATE_SALE_TRANSACTION,
    GET_STORE_SALE_VIEW,
} from "./actionType";
  
const INIT_STATE = {
    imeiScannedData: {},
    response: {},
    error: {},
    customers:{},
};
  
const Sale = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case IMEI_SCAN:
                    return {
                        ...state,
                        imeiScannedData: action.payload.data,
                    };
                case GET_SALE_LIST:
                    return {
                        ...state,
                        response: action.payload.data,
                    };
                case GET_STORE_SALE_VIEW:
                    return {
                        ...state,
                        customers: action.payload.data,
                    };
                case CREATE_SALE_TRANSACTION:
                    return {
                        ...state,
                        createSaleTransactionResponse: action.payload.data,
                    }
                default:
                    return { ...state };
            }
        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case IMEI_SCAN:
                    return {
                        ...state,
                        imeiScannedError: action.payload.error,
                    }; 
                case GET_SALE_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_STORE_SALE_VIEW:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case CREATE_SALE_TRANSACTION:
                    return {
                        ...state,
                        createSaleTransactionError: action.payload.error,
                    }
                default:
                    return { ...state };
            }
            
        default:
            return { ...state };
    }
};
  
export default Sale;
  