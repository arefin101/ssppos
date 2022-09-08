import { call, put, takeEvery, all, fork } from "redux-saga/effects";


import { 
    GET_PURCHASE_VARIATION,
    CREATE_PURCHASE_VARIATIONS,
    GET_PURCHASE_VARIATIONS_BY_ID,
    GET_STORE_PURCHASE_VARIATION_VIEW,
} from "./actionType";

import {
    puchaseVariationApiResponseSuccess,
    purchaseVariationApiResponseError,
} from "./action";


import {
    getPurchaseVariations as getPurchaseVariationsApi,
    createPurchaseVariations as createPurchaseVariationsApi,
    getPurchaseVariationsById as getPurchaseVariationsByIdApi,
    getStorePurchaseVariationView as getStorePurchaseVariationViewApi,
} from "../../helpers/fakebackend_helper";


function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}

function* getPurchaseVariations({payload:{history}}) {
    try {
        const response =  yield call (getPurchaseVariationsApi);
        yield put(puchaseVariationApiResponseSuccess(GET_PURCHASE_VARIATION, response));
    } 
    catch (error) { 
        if(error[1] === 401){
            redirectToLogin(history)
        }else{
            yield put(purchaseVariationApiResponseError(GET_PURCHASE_VARIATION, error[0]));
        }
    }
}

function* getPurchaseVariationsById({payload: { id, history } } ){
    try {
        const response =  yield call (getPurchaseVariationsByIdApi, id);
        localStorage.setItem('variationsById', "success")
        yield put(puchaseVariationApiResponseSuccess(GET_PURCHASE_VARIATIONS_BY_ID, response));
    } 
    catch (error) { 
        if(error[1] === 401){
            redirectToLogin(history)
        }else{
            yield put(purchaseVariationApiResponseError(GET_PURCHASE_VARIATIONS_BY_ID, error[0]));
        }
    }
}

function* getStorePurchaseVariationView({payload:{history}}) {
    try {
        const response =  yield call (getStorePurchaseVariationViewApi);
        yield put(puchaseVariationApiResponseSuccess(GET_STORE_PURCHASE_VARIATION_VIEW, response));
    } 
    catch (error) { 
        if(error[1] === 401){
            redirectToLogin(history)
        }else{
            yield put(purchaseVariationApiResponseError(GET_STORE_PURCHASE_VARIATION_VIEW, error[0]));
        }
    }
}


function*  createPurchaseVariation({payload:{purchaseVariation, history}}) {

    try {
        const response =  yield call (createPurchaseVariationsApi, purchaseVariation);
        localStorage.setItem('purchaseVariation', JSON.stringify(response.purchase_variation))
        yield put(puchaseVariationApiResponseSuccess(CREATE_PURCHASE_VARIATIONS, response));
    } 
    catch (error) { 
        if(error[1] === 401){
            redirectToLogin(history)
        }else{
            yield put(purchaseVariationApiResponseError(CREATE_PURCHASE_VARIATIONS, error[0]));
        }
    }

}

  
export function* watchGetPurchaseVariation() {
    yield takeEvery(GET_PURCHASE_VARIATION, getPurchaseVariations);
}
  
export function* watchCreatePurchaseVariation() {
    yield takeEvery(CREATE_PURCHASE_VARIATIONS, createPurchaseVariation);
}

export function* watchGetPurchaseVariationsById() {
    yield takeEvery(GET_PURCHASE_VARIATIONS_BY_ID, getPurchaseVariationsById);
}

export function* watchGetStorePurchaseVariationView() {
    yield takeEvery(GET_STORE_PURCHASE_VARIATION_VIEW, getStorePurchaseVariationView);
}
  

function* purchaseVariationSaga() {
    yield all([
        fork(watchGetPurchaseVariation),
        fork(watchCreatePurchaseVariation),
        fork(watchGetPurchaseVariationsById),
        fork(watchGetStorePurchaseVariationView),
    ]);
}


export default purchaseVariationSaga;