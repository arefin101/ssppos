import {
    GET_PRODUCT_CATEGORY_LIST,
    API_RESPONSE_ERROR,
    API_RESPONSE_SUCCESS,
} from "./actionType";
  

const INIT_STATE = {
    product_categories: [],
};
  
const ProductCategory = (state = INIT_STATE, action) => {

    switch (action.type) {

        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {
            
                case GET_PRODUCT_CATEGORY_LIST:
                    return {
                        ...state,
                        product_categories: action.payload.data,
                    };

                default:
                    return { ...state };

            }
            
        case API_RESPONSE_ERROR:
            
            switch (action.payload.actionType) {
                
                case GET_PRODUCT_CATEGORY_LIST:
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
  
export default ProductCategory;
  