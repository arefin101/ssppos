import {
    GET_EXPENSE_CATEGORY_LIST,
    CREATE_EXPENSE_CATEGORY,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
  } from "./actionType";
  


export const expensecategoryApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const expensecategoryApiResponseError = (actionType, error) => ({
        type: API_RESPONSE_ERROR,
        payload: { actionType, error },
});

export const getExpenseCategory = (history) => ({
    type: GET_EXPENSE_CATEGORY_LIST,
    payload:{history}
});

export const createExpenseCategory = (expenseCategory , history) => ({
    type: CREATE_EXPENSE_CATEGORY,
    payload: { expenseCategory  , history},
});