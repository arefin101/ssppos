import {
    GET_EXPENSE_CATEGORY_LIST,
    CREATE_EXPENSE_CATEGORY,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
  } from "./actionType";
  
  const INIT_STATE = {
    expense_categories: [],
    response:{},
    error: {},
    loading: false,
  };
  
  const ExpenseCategory = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {

                case GET_EXPENSE_CATEGORY_LIST:
                    return {
                        ...state,
                        expense_categories: action.payload.data,
                    }; 

                case CREATE_EXPENSE_CATEGORY:
                    return {
                        ...state,
                        response: action.payload.data,
                    }; 

                default:
                    return { ...state };
            }
            
        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_EXPENSE_CATEGORY_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case CREATE_EXPENSE_CATEGORY:
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
  
  export default ExpenseCategory;
  