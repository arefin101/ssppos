
import { 
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_PRODUCT_LIST,
    GET_PRODUCT_BRAND_SELECT,
    CREATE_PRODUCT_PHONE,
    CREATE_PRODUCT_CHARGER,
    GET_PRODUCT_CATEGORY,
    REMOVE_PRODUCT_CATEGORY,
    GET_VARIATIONS_BY_PRODUCT,
} from "./actionType";
  
  const INIT_STATE = {
    productBrandsSelect: [],
    products: [],
    productVariations: [],
    productCategoryType:{},
    error: {},
    errorPhone: {},
  };
  
const Product = (state = INIT_STATE, action) => {
    
    switch (action.type) {

        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {

                case GET_PRODUCT_LIST:
                    return {
                        ...state,
                        products: action.payload.data,
                    };

                case GET_PRODUCT_BRAND_SELECT:
                    return {
                        ...state,
                        productBrandsSelect: action.payload.data,
                    }

                case CREATE_PRODUCT_PHONE:
                    return {
                        ...state,
                        response: action.payload.data,
                    };

                case CREATE_PRODUCT_CHARGER:
                    return {
                        ...state,
                        response: action.payload.data,
                    };

                case GET_VARIATIONS_BY_PRODUCT:
                    return {
                        ...state,
                        productVariations: action.payload.data,
                    }

                // EXCEPTIONAL CASE
                case GET_PRODUCT_CATEGORY:
                    return {
                        ...state,
                        productCategoryType: action.payload.data.product_category_type,
                    };

            default:
                return { ...state };
            }
        
    case API_RESPONSE_ERROR:
        switch (action.payload.actionType) {

            case GET_PRODUCT_LIST:
                return {
                ...state,
                error: action.payload.error,
            };

            case GET_PRODUCT_BRAND_SELECT:
                return {
                    ...state,
                    error: action.payload.error,
                }

            case CREATE_PRODUCT_PHONE:
                return {
                    ...state,
                    errorPhone: action.payload.error,
                };

            case CREATE_PRODUCT_CHARGER:
                return {
                    ...state,
                    error: action.payload.error,
                }
            
            case GET_PRODUCT_CATEGORY:
                return {
                    ...state,
                    error: action.payload.error,
                };

            default:
                return { ...state };
        } 


    case REMOVE_PRODUCT_CATEGORY: 

        return {
            ...state,
            productCategoryType: {},
        }
            
    default:
        return { ...state };

    }
    
};
  
  export default Product;
  