import {
    GET_PURCHASE,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    CREATE_PURCHASE,
    GET_STORE_PURCHASE_VIEW,
} from "./actionType";

  
const INIT_STATE = {
    purchases: [],
    error: {},
    response: {},
    supplier: {},
};

  
const Purchase = (state = INIT_STATE, action) => {

    switch (action.type) {

        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {

                case GET_PURCHASE:
                    return {
                        ...state,
                        purchases: action.payload.data,
                    };

                case GET_STORE_PURCHASE_VIEW:
                    return {
                        ...state,
                        supplier: action.payload.data,
                    };

                case CREATE_PURCHASE:
                    return {
                        ...state,
                        response: action.payload.data,
                    };

                default:
                    return { ...state };

            }

        case API_RESPONSE_ERROR:

            switch (action.payload.actionType) {

                case GET_PURCHASE:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_STORE_PURCHASE_VIEW:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                
                case CREATE_PURCHASE:
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
  
  export default Purchase;
  