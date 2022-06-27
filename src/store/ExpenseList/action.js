import {
    GET_EXPENSE_LIST,
    GET_EXPENSE_VIEW,
    CREATE_EXPENSE_STORE,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
  } from "./actionType";
  
  
export const expenselistApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const expenselistApiResponseError = (actionType, error) => ({
        type: API_RESPONSE_ERROR,
        payload: { actionType, error },
});

export const getExpenseList = (history) => ({
    type: GET_EXPENSE_LIST,
    payload:{history}
});

export const getExpenseView = (history) => ({
    type: GET_EXPENSE_VIEW,
    payload:{history}
})

export const createExpense = (expense, history) => ({
    type: CREATE_EXPENSE_STORE,
    payload: { expense  , history},
});