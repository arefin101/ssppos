import {
    GET_EXPENSE_LIST,
    GET_EXPENSE_VIEW,
    CREATE_EXPENSE_STORE,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
} from "./actionType";
  
const INIT_STATE = {
    response: {},
    expense_transactions: [],
    error: {},
    createResponse: {},
    loading: false,
};
  
const ExpenseList = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_EXPENSE_LIST:
                    return {
                        ...state,
                        expense_transactions: action.payload.data,
                    }; 
                case GET_EXPENSE_VIEW:
                    return {
                        ...state,
                        response: action.payload.data,
                    }; 
                case CREATE_EXPENSE_STORE:
                    return {
                        ...state,
                        createResponse: action.payload.data,
                    }; 
                default:
                    return { ...state };
            }
        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_EXPENSE_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_EXPENSE_VIEW:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case CREATE_EXPENSE_STORE:
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
  
export default ExpenseList;
  