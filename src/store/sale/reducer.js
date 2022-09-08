import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    IMEI_SCAN,
    GET_SALE_LIST,
    CREATE_SALE_TRANSACTION,
    GET_STORE_SALE_VIEW,
    GET_SALE_VARIATIONS,
    GET_PURCHASE_VARIATIONS_SALE,
    ALTERNATIVE_SCAN,
    SALE_RETURN_LIST,
    SALE_RETURN_VARIATION_BY_ID,
    GET_SALE_RETURN_STORE_VIEW,
    CREATE_SALE_RETURN,
    GET_SALE_INVOICE,
    GET_SALE_RETURN_INVOICE,
    // DOWNLOAD_SALE_INVOICE,
    EMAIL_SALE_INVOICE,
    SALE_TRANSACTION_VERIFICATION,
    SALE_RETURN_TRANSACTION_VERIFICATION,
    SELLING_PRICE_APPROVAL
} from "./actionType";
  
const INIT_STATE = {
    imeiScannedData: {},
    purchaseVariationSale: [],
    alternativeScannedData: {},
    saleReturnList: [],
    saleVariaitons: [],
    saleReturnStoreView: [],
    saleReturnVariations: [],
    response: {},
    imeiScannedError: {},
    alternativeScannedError:{},
    createSaleTransactionError:{},
    saleReturnListError:[],
    saleReturnVariationsError: [],
    createSaleReturnError: [],
    saleInvoiceResponse: [],
    saleInvoiceError: [],
    saleReturnInvoiceResponse: [],
    saleReturnInvoiceError: [],
    sellingPriceApproval:"2",
    error: {},
    customers:{},
    invoiceEmailResponse: {},
    verifyResponse: [],
    verifyError: [],
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
                case GET_SALE_VARIATIONS:
                    return {
                        ...state,
                        saleVariaitons: action.payload.data,
                    };
                case GET_PURCHASE_VARIATIONS_SALE:
                    return {
                        ...state,
                        purchaseVariationSale: action.payload.data,
                    }
                case ALTERNATIVE_SCAN:
                    return {
                        ...state,
                        alternativeScannedData: action.payload.data,
                    };
                case SALE_RETURN_LIST:
                    return {
                        ...state,
                        saleReturnList: action.payload.data
                    };
                case SALE_RETURN_VARIATION_BY_ID:
                    return {
                        ...state,
                        saleReturnVariations: action.payload.data
                    };
                case GET_SALE_RETURN_STORE_VIEW:
                    return {
                        ...state,
                        saleReturnStoreView: action.payload.data,
                    };
                case CREATE_SALE_RETURN:
                    return {
                        ...state,
                        response: action.payload.data
                    }
                case GET_SALE_INVOICE:
                    return {
                        ...state,
                        saleInvoiceResponse: action.payload.data
                    }
                // case DOWNLOAD_SALE_INVOICE:
                //     return {
                //         ...state,
                //         saleInvoiceResponse: action.payload.data
                //     }
                case EMAIL_SALE_INVOICE:
                    return {
                        ...state,
                        invoiceEmailResponse: action.payload.data
                    }
                case GET_SALE_RETURN_INVOICE:
                    return {
                        ...state,
                        saleReturnInvoiceResponse: action.payload.data
                    }
                case SALE_TRANSACTION_VERIFICATION:
                    return {
                        ...state,
                        verifyResponse: action.payload.data
                    }
                case SALE_RETURN_TRANSACTION_VERIFICATION:
                    return {
                        ...state,
                        verifyResponse: action.payload.data
                    }
                case SELLING_PRICE_APPROVAL:
                    return {
                        ...state,
                        sellingPriceApproval: action.payload.data
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
                    };
                case GET_SALE_VARIATIONS:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case ALTERNATIVE_SCAN:
                    return {
                        ...state,
                        alternativeScannedError: action.payload.error,
                    };
                case SALE_RETURN_LIST:
                    return {
                        ...state,
                        saleReturnListError: action.payload.error
                    };
                case SALE_RETURN_VARIATION_BY_ID:
                    return {
                        ...state,
                        saleReturnVariationsError: action.payload.error
                    };
                case GET_SALE_RETURN_STORE_VIEW:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case CREATE_SALE_RETURN:
                    return {
                        ...state,
                        createSaleReturnError: action.payload.error
                    }
                case GET_SALE_INVOICE:
                    return {
                        ...state,
                        error: action.payload.error
                    }
                // case DOWNLOAD_SALE_INVOICE:
                //     return {
                //         ...state,
                //         error: action.payload.error
                //     }
                case EMAIL_SALE_INVOICE:
                    return {
                        ...state,
                        error: action.payload.error
                    }
                case GET_SALE_RETURN_INVOICE:
                    return {
                        ...state,
                        error: action.payload.error
                    }
                case SALE_TRANSACTION_VERIFICATION:
                    return {
                        ...state,
                        verifyError: action.payload.error
                    }
                case SALE_RETURN_TRANSACTION_VERIFICATION:
                    return {
                        ...state,
                        verifyError: action.payload.error
                    }
                case SELLING_PRICE_APPROVAL:
                    return {
                        ...state,
                        error: action.payload.error
                    }
                default:
                    return { ...state };
            }
            
        default:
            return { ...state };
    }
};
  
export default Sale;
  