import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_AVERAGE_PURCHASE_PRICES,
    GET_PURCHASE_PRODUCT_LIST,
} from "./actionType";

const INIT_STATE = {
    averagePurchasePrices: [],
    productList: {},
    error: {},
    reponse: {},
};

const AveragePurchasePrice = (state = INIT_STATE, action) => {

    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_AVERAGE_PURCHASE_PRICES:
                    return {
                        ...state,
                        averagePurchasePrices : action.payload.data,
                    };
                case GET_PURCHASE_PRODUCT_LIST:
                    return {
                        ...state,
                        productList : action.payload.data,
                    };
                default:
                    return {
                        ...state,
                    }
            }
        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_AVERAGE_PURCHASE_PRICES:
                    return {
                        ...state,
                        error : action.payload.error,
                    };
                case GET_PURCHASE_PRODUCT_LIST:
                    return {
                        ...state,
                        error : action.payload.error,
                    };
                default:
                    return {
                        ...state,
                    }
            }

        default:
            return {
                ...state,
            }
    }

};

export default AveragePurchasePrice;