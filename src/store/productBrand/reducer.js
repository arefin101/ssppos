import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_BRAND_LIST,
    CREATE_BRAND,
} from "./actionType";

const INIT_STATE = {
    brands: [],
    response: {},
    error: {},
    errorBrand: {}
}

const productBrand = (state = INIT_STATE, action) => {

    switch (action.type) {

        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {

                case GET_BRAND_LIST:

                    return {
                        ...state,
                        brands: action.payload.data,
                    };
                
                case CREATE_BRAND:

                    return {
                        ...state,
                        response: action.payload.data,
                    };

                default:
                    return { ...state };
            }
        
        case API_RESPONSE_ERROR:

            switch (action.payload.actionType) {

                case GET_BRAND_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case CREATE_BRAND:
                    return {
                        ...state,
                        errorBrand: action.payload.error,
                    };

                default:
                    return { ...state };

            }

        default:
            return { ...state };
        }

  };
  
  export default productBrand;