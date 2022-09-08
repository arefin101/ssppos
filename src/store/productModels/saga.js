import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { GET_PRODUCT_MODEL_LIST, CREATE_PRODUCT_MODEL } from "./actionType";

import {
    productModelApiResponseSuccess,
    productModelApiResponseError,
} from "./action";


import {
  getProductModelList as getProductModelListApi,
  createProductModel as createProductModelApi,
  
} from "../../helpers/fakebackend_helper";

function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}


function* getProductModelList({payload:{history}}) {

    try {
        const response = yield call(getProductModelListApi);
        yield put(productModelApiResponseSuccess(GET_PRODUCT_MODEL_LIST, response));
    } catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(productModelApiResponseError(GET_PRODUCT_MODEL_LIST , error[0]));
        }
    } 
}


function* createProductModel({payload:{ productModel , history } }) {

    try {

        const response =  yield call(createProductModelApi, {
            name:productModel.name.toUpperCase(),
        });

        localStorage.setItem("productModel", JSON.stringify(response));
        yield put(productModelApiResponseSuccess(CREATE_PRODUCT_MODEL, response));
        history.push("/models");
        
    } catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(productModelApiResponseError(CREATE_PRODUCT_MODEL, error[0]));
        }
    } 
}

export function* watchGetProductModelList() {
    yield takeEvery(GET_PRODUCT_MODEL_LIST, getProductModelList);
}
export function* watchCreateProductModel(){
    yield takeEvery(CREATE_PRODUCT_MODEL, createProductModel);
}

function* productModelsSaga() {
    yield all([

        fork(watchCreateProductModel),
        fork(watchGetProductModelList),

    ]);
}
export default productModelsSaga;