import {
    GET_PURCHASE_VARIATION,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    CREATE_PURCHASE_VARIATIONS,
    GET_PURCHASE_VARIATIONS_BY_ID,
    GET_STORE_PURCHASE_VARIATION_VIEW,
} from "./actionType";
  
const INIT_STATE = {
    purchaseVariations: [],
    purchaseVariation: [],
    purchaseVariationsById: [],
    error: {},
    errorPurchaseVariations: {},
    response: {},
};
  
const PurchaseVariations = (state = INIT_STATE, action) => {
    
    switch (action.type) {
        
        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {
                
                case GET_PURCHASE_VARIATION:
                    return {
                        ...state,
                        purchaseVariations: action.payload.data,
                    };
                
                case GET_STORE_PURCHASE_VARIATION_VIEW:
                    return {
                        ...state,
                        response: action.payload.data,
                    };

                case CREATE_PURCHASE_VARIATIONS:
                    return {
                        ...state,
                        purchaseVariation: action.payload.data.purchase_variation,
                    };

                case GET_PURCHASE_VARIATIONS_BY_ID:
                    return {
                        ...state,
                        purchaseVariationsById: action.payload.data
                    }

                default:
                    return { ...state };

            }

        case API_RESPONSE_ERROR:

            switch (action.payload.actionType) {

                case GET_PURCHASE_VARIATION:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                
                case GET_STORE_PURCHASE_VARIATION_VIEW:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case  CREATE_PURCHASE_VARIATIONS:
                    return{
                        ...state,
                        errorPurchaseVariations:action.payload.error
                    }

                case GET_PURCHASE_VARIATIONS_BY_ID:
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

  
export default PurchaseVariations;
  