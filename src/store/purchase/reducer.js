import {
    GET_PURCHASE,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    CREATE_PURCHASE,
    GET_STORE_PURCHASE_VIEW,
    GET_PURCHASE_INVOICE,
    PURCHASE_TOGGLE_LOCK,
    PURCHASE_VERIFICATION,
    GET_PURCHASE_RETURN_LIST,
    GET_PURCHASE_RETURN_VARIATIONS,
    PURCHASE_RETURN_VERIFICATION,
    CREATE_PURCHASE_RETURN,
} from "./actionType";

  
const INIT_STATE = {
    error: {},
    response: {},
    supplier: {},
    purchases: [],
    purchaseReturns: [],
    purchaseReturnVariations: [],
    invoiceResponse: [],
    invoiceError: [],
    lockStatus: [],
    verifyResponse: [],
    verifyError: [],
    storeResponse:[],
};

  
const Purchase = (state = INIT_STATE, action) => {

    switch (action.type) {

        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {

                case GET_PURCHASE:
                    return {
                        ...state,
                        purchases: action.payload.data,
                    };

                case GET_STORE_PURCHASE_VIEW:
                    return {
                        ...state,
                        supplier: action.payload.data,
                    };

                case CREATE_PURCHASE:
                    return {
                        ...state,
                        response: action.payload.data,
                    }; 
                case GET_PURCHASE_INVOICE:
                    return {
                        ...state,
                        invoiceResponse: action.payload.data,
                    }
                case PURCHASE_TOGGLE_LOCK:
                    return {
                        ...state,
                        lockStatus: action.payload.data,
                    }
                case PURCHASE_VERIFICATION:
                    return {
                        ...state,
                        verifyResponse: action.payload.data,
                    }
                case GET_PURCHASE_RETURN_LIST:
                    return {
                        ...state,
                        purchaseReturns: action.payload.data,
                    }
                case GET_PURCHASE_RETURN_VARIATIONS:
                    return {
                        ...state,
                        purchaseReturnVariations: action.payload.data,
                    }
                case PURCHASE_RETURN_VERIFICATION:
                    return {
                        ...state,
                        verifyResponse: action.payload.data,
                    }
                case CREATE_PURCHASE_RETURN:
                    return {
                        ...state,
                        storeResponse: action.payload.data,
                    }

                default:
                    return { ...state };

            }

        case API_RESPONSE_ERROR:

            switch (action.payload.actionType) {

                case GET_PURCHASE:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_STORE_PURCHASE_VIEW:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                
                case CREATE_PURCHASE:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_PURCHASE_INVOICE:
                    return {
                        ...state,
                        invoiceError: action.payload.error,
                    }
                case PURCHASE_TOGGLE_LOCK:
                    return {
                        ...state,
                        error: action.payload.error,
                    }
                case PURCHASE_VERIFICATION:
                    return {
                        ...state,
                        verifyError: action.payload.error,
                    }
                case GET_PURCHASE_RETURN_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    }
                case GET_PURCHASE_RETURN_VARIATIONS:
                    return {
                        ...state,
                        error: action.payload.error,
                    }
                case PURCHASE_RETURN_VERIFICATION:
                    return {
                        ...state,
                        verifyError: action.payload.error,
                    }
                case CREATE_PURCHASE_RETURN:
                    return {
                        ...state,
                        error: action.payload.error,
                    }

                default:
                    return { ...state };
            }
            
        default:
            return { ...state };

    }
};
  
  export default Purchase;
  