import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_POOL_HISTORY,
    DELETE_POOL_HISTORY,
    UPDATE_POOL_HISTORY,
    ADD_POOL,
    WITHDRAW_POOL,
} from "./actionType";

const INIT_STATE = {
    response: [],
    error: {},
    poolHistory: [],
    deleteResponse: {},
    updateResponse: [],
};

const Pool = (state = INIT_STATE, action) => {
    
    switch (action.type) {

        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {

                case GET_POOL_HISTORY:
                    return {
                        ...state,
                        poolHistory: action.payload.data,
                    };

                case DELETE_POOL_HISTORY:
                    return {
                        ...state,
                        deleteResponse: action.payload.data,
                    };

                case UPDATE_POOL_HISTORY:
                    return {
                        ...state,
                        updateResponse: action.payload.data,
                    };
                    
                case ADD_POOL:
                    return {
                        ...state,
                        response: action.payload.data,
                    };

                case WITHDRAW_POOL:
                    return {
                        ...state,
                        response: action.payload.data,
                    };

                default:
                    return { ...state };
            }
        
        case API_RESPONSE_ERROR:

            switch (action.payload.actionType) {

                case GET_POOL_HISTORY:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case DELETE_POOL_HISTORY:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                    
                case ADD_POOL:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case UPDATE_POOL_HISTORY:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                    
                case WITHDRAW_POOL:
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
  
  export default Pool;
  