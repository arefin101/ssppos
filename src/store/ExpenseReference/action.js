import {
    GET_EXPENSE_REFERENCE_LIST,
    CREATE_EXPENSE_REFERENCE,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
  } from "./actionType";
  

export const expensereferenceApiResponseSuccess = (actionType, data) => ({
    
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const expensereferenceApiResponseError = (actionType, error) => ({
        type: API_RESPONSE_ERROR,
        payload: { actionType, error },
});

export const getExpenseReference = (history) => ({
    type: GET_EXPENSE_REFERENCE_LIST,
    payload:{history}
})

export const createExpenseReference = (expenseReference , history) => ({
    type: CREATE_EXPENSE_REFERENCE,
    payload: { expenseReference  , history},
});