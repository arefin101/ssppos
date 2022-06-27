import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { 
    GET_EXPENSE_LIST,
    CREATE_EXPENSE_STORE, 
    GET_EXPENSE_VIEW
} from "./actionType";

import {
    expenselistApiResponseSuccess,
    expenselistApiResponseError,
} from "./action";

import {
    getExpenseList as getExpenseListApi,
    createExpense as createExpenseApi ,
    getExpenseView as getExpenseViewApi,
} from "../../helpers/fakebackend_helper";


function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}


function* getExpenseList({payload:{history}}) {
    try {
        const response = yield call(getExpenseListApi);
        yield put(expenselistApiResponseSuccess(GET_EXPENSE_LIST, response));
    } 
    catch (error) {
        if(error[1] == 401){
            redirectToLogin(history)
        }
        else{
            yield put(expenselistApiResponseError(GET_EXPENSE_LIST, error[0]));
        }
    }
}

function* getExpenseView({payload:{history}}) {
    try {
        const response = yield call(getExpenseViewApi);
        yield put(expenselistApiResponseSuccess(GET_EXPENSE_VIEW, response));
    } 
    catch (error) {
        if(error[1] == 401){
            redirectToLogin(history)
        }
        else{
            yield put(expenselistApiResponseError(GET_EXPENSE_VIEW, error[0]));
        }
    }
}

function* createExpense({ payload:{ expense, history} }) {
    try {
        const response =  yield call(createExpenseApi, expense);
        localStorage.setItem("expense", JSON.stringify(response));
        yield put(expenselistApiResponseSuccess( CREATE_EXPENSE_STORE, history));
        history.push("/expense-list");
    } catch (error) {
        if(error[1] == 401){
            redirectToLogin(history);
        }
        else{
            yield put(expenselistApiResponseError( CREATE_EXPENSE_STORE, error[0]));
        }
    }
}
     


export function* watchCreateExpense(){
    yield takeEvery(CREATE_EXPENSE_STORE, createExpense);
}
export function* watchExpenseList() {
  yield takeEvery(GET_EXPENSE_LIST, getExpenseList);
}
export function* watchExpenseView() {
  yield takeEvery(GET_EXPENSE_VIEW, getExpenseView);
}



function* expenseListSaga() {  
    yield all([
        fork(watchCreateExpense),
        fork(watchExpenseList),
        fork(watchExpenseView),
    ]);
}

export default expenseListSaga;
