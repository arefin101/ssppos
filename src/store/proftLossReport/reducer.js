import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_PROFIT_BY_CUSTOMER,
    GET_PROFIT_BY_SALE_INVOICE,
    GET_PROFIT_BY_CUSTOMER_VIEW,
    GET_PROFIT_BY_DATE,
    GET_PROFIT_BY_PRODUCTS,
    GET_PROFIT_BY_PRODUCT_MODELS,
    GET_PROFIT_BY_PRODUCT_CATAGORIES,
} from "./actionType";

const INIT_STATE = {
    response: [],
    error: {},
    profitByCustomerResponse: [],
    viewResponse: [],
    profitBySaleResponse: [],
    profitByDate: [],
    profitByProducts: [],
    profitByProductModels: [],
    profitByProductCatagories: [],
};

const ProfitLossReport = (state = INIT_STATE, action) => {
    
    switch (action.type) {

        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {

                case GET_PROFIT_BY_CUSTOMER:
                    return {
                        ...state,
                        profitByCustomerResponse: action.payload.data,
                    };
                case GET_PROFIT_BY_CUSTOMER_VIEW:
                    return {
                        ...state,
                        viewResponse: action.payload.data,
                    };
                case GET_PROFIT_BY_SALE_INVOICE:
                    return {
                        ...state,
                        profitBySaleResponse: action.payload.data,
                    };
                case GET_PROFIT_BY_DATE:
                    return {
                        ...state,
                        profitByDate: action.payload.data,
                    };
                case GET_PROFIT_BY_PRODUCTS:
                    return {
                        ...state,
                        profitByProducts: action.payload.data,
                    };
                case GET_PROFIT_BY_PRODUCT_MODELS:
                    return {
                        ...state,
                        profitByProductModels: action.payload.data,
                    };
                case GET_PROFIT_BY_PRODUCT_CATAGORIES:
                    return {
                        ...state,
                        profitByProductCatagories: action.payload.data,
                    };
        
                default:
                    return { ...state };
            }
        
        case API_RESPONSE_ERROR:

            switch (action.payload.actionType) {

                case GET_PROFIT_BY_CUSTOMER:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_PROFIT_BY_CUSTOMER_VIEW:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_PROFIT_BY_SALE_INVOICE:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_PROFIT_BY_DATE:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_PROFIT_BY_PRODUCTS:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_PROFIT_BY_PRODUCT_MODELS:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_PROFIT_BY_PRODUCT_CATAGORIES:
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
  
  export default ProfitLossReport;
  