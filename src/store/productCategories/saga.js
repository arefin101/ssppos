import { call, put, takeEvery, all, fork } from "redux-saga/effects";


import { GET_PRODUCT_CATEGORY_LIST} from "./actionType";

import {
    productCategoryApiResponseSuccess,
    productCategoryApiResponseError,
    
} from "./action";


import {
    getProductCategoryList as getProductCategoryListApi,
} from "../../helpers/fakebackend_helper";


function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}


function* getProductCategoryList({payload:{history}}) {

    try {
    const response = yield call(getProductCategoryListApi);
    yield put(productCategoryApiResponseSuccess(GET_PRODUCT_CATEGORY_LIST, response));
    }catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(productCategoryApiResponseError(GET_PRODUCT_CATEGORY_LIST , error[0]));
        }
    } 
}


export function* watchGetProductCategoryList() {
    yield takeEvery(GET_PRODUCT_CATEGORY_LIST, getProductCategoryList);
}


function* productCategorySaga() {
  yield all([
    fork(watchGetProductCategoryList),
  ]);
}


export default productCategorySaga;
