import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_AVERAGE_PURCHASE_PRICES,
} from "./actionType";

const INIT_STATE = {
    averagePurchasePrices: [],
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
                        error : action.payload.data,
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