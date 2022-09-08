import {
    GET_SKU_TRANSFER_VIEW_DATA,
    GET_SKU_TRANSFER_STORE_DATA,
    SKU_TRANSFER,
    SKU_TRANSFER_HISTORY_DETAILS,
    SKU_TRANSFER_HISTORY,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
} from "./actionType";

const INIT_STATE = {
    skuTransferViewData: [],
    skuTransferStoreData: [],
    skuTransferResponse: [],
    skuTransferHistory: [],
    skuTransferHistoryDetails: [],
    skuTransferError: {},
    skuTransferHistoryError: {},
    error: {},
};

const SkuTransfer = (state = INIT_STATE, action) => {

    switch (action.type) {

        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {

                case GET_SKU_TRANSFER_VIEW_DATA:
                    return {
                        ...state,
                        skuTransferViewData: action.payload.data,
                    };

                case GET_SKU_TRANSFER_STORE_DATA:
                    return {
                        ...state,
                        skuTransferStoreData: action.payload.data,
                    };

                case SKU_TRANSFER:
                    return {
                        ...state,
                        skuTransferResponse: action.payload.data,
                    };

                case SKU_TRANSFER_HISTORY:
                    return {
                        ...state,
                        skuTransferHistory: action.payload.data,
                    };

                case SKU_TRANSFER_HISTORY_DETAILS:
                    return {
                        ...state,
                        skuTransferHistoryDetails: action.payload.data,
                    };

                default:
                    return { ...state };

            }

        case API_RESPONSE_ERROR:

            switch (action.payload.actionType) {
                
                case GET_SKU_TRANSFER_VIEW_DATA:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_SKU_TRANSFER_STORE_DATA:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case SKU_TRANSFER:
                    return {
                        ...state,
                        skuTransferError: action.payload.error,
                    };
    
                case SKU_TRANSFER_HISTORY:
                    return {
                        ...state,
                        skuTransferHistoryError: action.payload.error,
                    };

                case SKU_TRANSFER_HISTORY_DETAILS:
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

export default SkuTransfer;