import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { 
    GET_EXPENSE_CATEGORY_LIST,
    CREATE_EXPENSE_CATEGORY
} from "./actionType";

import {
    expensecategoryApiResponseSuccess,
    expensecategoryApiResponseError,
} from "./action";

import {
    getExpenseCategoryList as getExpenseCategoryListApi,
    createExpenseCategory as createExpenseCategoryApi ,
} from "../../helpers/fakebackend_helper";


function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}


function* getExpenseCategoryList({payload:{history}}) {
    try {
        const response = yield call(getExpenseCategoryListApi);
        yield put(expensecategoryApiResponseSuccess(GET_EXPENSE_CATEGORY_LIST, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(expensecategoryApiResponseError(GET_EXPENSE_CATEGORY_LIST, error[0]));
        }
    }
}

function* createExpenseCategory({ payload:{ expenseCategory ,history} }) {
    try {
        const response =  yield call(createExpenseCategoryApi,{
            name:expenseCategory.name.toUpperCase(),
        });
        localStorage.setItem("expenseCategory", JSON.stringify(response));
        yield put(expensecategoryApiResponseSuccess(CREATE_EXPENSE_CATEGORY, response));
        history.push("/expense-categories");
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history);
        }
        else{
            yield put(expensecategoryApiResponseError(CREATE_EXPENSE_CATEGORY, error[0]));
        }
    }
}

  


export function* watchCreateExpenseCategory(){
    yield takeEvery(CREATE_EXPENSE_CATEGORY, createExpenseCategory);
}
export function* watchExpenseCategoryList() {
  yield takeEvery(GET_EXPENSE_CATEGORY_LIST, getExpenseCategoryList);
}





function* expenseCategorySaga() {
    yield all([
        fork(watchCreateExpenseCategory),
        fork(watchExpenseCategoryList),
    ]);
}

export default expenseCategorySaga;
