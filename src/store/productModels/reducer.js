import {
    GET_PRODUCT_MODEL_LIST,
    CREATE_PRODUCT_MODEL,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
} from "./actionType";

const INIT_STATE = {
    productModels: [],
    error: {},
};

const ProductModel = (state = INIT_STATE, action) => {
    switch (action.type) {

        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {

                case GET_PRODUCT_MODEL_LIST:
                    return {
                        ...state,
                        productModels: action.payload.data,
                    };

                case CREATE_PRODUCT_MODEL:
                    return {
                        ...state,
                        response: action.payload.data,
                    };
            
                default:
                    return { ...state };

            }
        
    case API_RESPONSE_ERROR:

        switch (action.payload.actionType) {

            case GET_PRODUCT_MODEL_LIST:
                return {
                ...state,
                error: action.payload.error,
            };

            case CREATE_PRODUCT_MODEL:
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
  
  export default ProductModel;
  