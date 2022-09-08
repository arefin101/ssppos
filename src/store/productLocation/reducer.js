import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_PRODUCTS_ON_HAND,
    GET_PRODUCTS_ON_HAND_VARIATIONS,
    GET_PRODUCT_TRANSFER_HISTORY,
    GET_PRODUCT_TRANSFER_VIEW,
    GET_PRODUCT_TRANSFER_HISTORY_DETAILS,
    CREATE_PRODUCT_TRANSFER,
    GET_PURCHASE_INVOICE_LIST,
    GET_LAST_TRANSACTION,
    GET_PRODUCT_BY_PURCHASE_INVOICE,
    GET_PRODUCT_BY_LAST_TRANSACTION,
    GET_PRODUCT_BY_IMEI_SCAN,
} from "./actionType";

const INIT_STATE = {
    productsOnHand: [],
    productOnHandVariations: [],
    productTransferView: [],
    productTransferHistory: [],
    productTransferHistoryDetails: [],
    purchaseInvoiceList:[],
    lastTransactions:[],
    productsByPurchaseInvoice:[],
    productsByLastTransition:[],
    productByImei: [],
    createProductTransfer: [],
    error: [],
}

const productLocation = (state = INIT_STATE, action) => {

    switch (action.type) {

        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {

                case GET_PRODUCTS_ON_HAND:
                    return {
                        ...state,
                        productsOnHand: action.payload.data,
                    };

                case GET_PRODUCTS_ON_HAND_VARIATIONS:
                    return {
                        ...state,
                        productOnHandVariations: action.payload.data,
                    };

                case GET_PRODUCT_TRANSFER_HISTORY_DETAILS:
                    return {
                        ...state,
                        productTransferHistoryDetails: action.payload.data,
                    };

                case GET_PRODUCT_TRANSFER_VIEW:
                    return {
                        ...state,
                        productTransferView: action.payload.data,
                    };

                case GET_PRODUCT_TRANSFER_HISTORY:
                    return {
                        ...state,
                        productTransferHistory: action.payload.data,
                    };

                case CREATE_PRODUCT_TRANSFER:
                    return {
                        ...state,
                        createProductTransfer: action.payload.data,
                    };
                case GET_PURCHASE_INVOICE_LIST:
                    return {
                        ...state,
                        purchaseInvoiceList: action.payload.data,
                    };
                case GET_LAST_TRANSACTION:
                    return {
                        ...state,
                        lastTransactions: action.payload.data,
                    };
                case GET_PRODUCT_BY_PURCHASE_INVOICE:
                    return{
                        ...state,
                        productsByPurchaseInvoice: action.payload.data,
                    }
                case GET_PRODUCT_BY_LAST_TRANSACTION:
                    return{
                        ...state,
                        productsByLastTransition: action.payload.data,
                    }
                case GET_PRODUCT_BY_IMEI_SCAN:
                    return{
                        ...state,
                        productByImei: action.payload.data,
                    }
                default:
                    return { ...state };
            }
        
        case API_RESPONSE_ERROR:

            switch (action.payload.actionType) {

                case GET_PRODUCTS_ON_HAND:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_PRODUCTS_ON_HAND_VARIATIONS:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_PRODUCT_TRANSFER_HISTORY_DETAILS:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_PRODUCT_TRANSFER_VIEW:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_PRODUCT_TRANSFER_HISTORY:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case CREATE_PRODUCT_TRANSFER:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_PURCHASE_INVOICE_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_LAST_TRANSACTION:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_PRODUCT_BY_PURCHASE_INVOICE:
                    return{
                        ...state,
                        error: action.payload.error,
                    }
                case GET_PRODUCT_BY_LAST_TRANSACTION:
                    return{
                        ...state,
                        error: action.payload.error,
                    }
                case GET_PRODUCT_BY_IMEI_SCAN:
                    return{
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
  
  export default productLocation;