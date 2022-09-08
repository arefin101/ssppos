import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { 
    GET_EXPENSE_REFERENCE_LIST,
    CREATE_EXPENSE_REFERENCE
} from "./actionType";

import {
    expensereferenceApiResponseSuccess,
    expensereferenceApiResponseError,
} from "./action";

import {
    getExpenseReferenceList as getExpenseReferenceListtApi,
    createExpenseReference as createExpenseReferenceApi ,
} from "../../helpers/fakebackend_helper";


function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}

function* getExpenseReferenceList({payload:{history}}) {
    try {
        const response = yield call(getExpenseReferenceListtApi);
        yield put(expensereferenceApiResponseSuccess(GET_EXPENSE_REFERENCE_LIST, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history);
        }
        else{
            yield put(expensereferenceApiResponseError(GET_EXPENSE_REFERENCE_LIST, error[0]));
        }
    }
}

function* createExpenseReference({ payload:{ expenseReference ,history} }) {
    try {
        const response =  yield call(createExpenseReferenceApi,{
            name:expenseReference.name.toUpperCase(),
        });
        localStorage.setItem("expenseReference", JSON.stringify(response));
        yield put(expensereferenceApiResponseSuccess(CREATE_EXPENSE_REFERENCE, response));
        history.push("/expense-references");
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history);
        }
        else{
            yield put(expensereferenceApiResponseError(CREATE_EXPENSE_REFERENCE, error[0]));
        }
    }
}
    
  


export function* watchcreateExpenseReference(){
    yield takeEvery(CREATE_EXPENSE_REFERENCE, createExpenseReference);
}
export function* watchExpenseReferenceList() {
  yield takeEvery(GET_EXPENSE_REFERENCE_LIST, getExpenseReferenceList);
}





function* expenseReferenceSaga() {
    yield all([
        fork(watchcreateExpenseReference),
        fork(watchExpenseReferenceList),
    ]);
}

export default expenseReferenceSaga;
