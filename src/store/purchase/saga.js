import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { 
    GET_PURCHASE,
    CREATE_PURCHASE,
    GET_STORE_PURCHASE_VIEW,
} from "./actionType";

import {
    puchaseApiResponseSuccess,
    purchaseApiResponseError,
} from "./action";

import {
    getPurchases as getPurchasesApi,
    createPurchase as createPurchaseApi,
    getStorePurchaseView as getStorePurchaseViewApi,
} from "../../helpers/fakebackend_helper";


function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}

function*  getPurchases({payload:{history}}) {
    try {
        const response =  yield call (getPurchasesApi);
        yield put(puchaseApiResponseSuccess(GET_PURCHASE, response));
    } 
    catch (error) { 
        if(error[1]==401){
            redirectToLogin(history)
        }else{
            yield put(purchaseApiResponseError(GET_PURCHASE, error[0]));
        }
    }
}

function* getStorePurchaseView({payload:{history}}) {
    try {
        const response =  yield call (getStorePurchaseViewApi);
        yield put(puchaseApiResponseSuccess(GET_STORE_PURCHASE_VIEW, response));
    } 
    catch (error) { 
        if(error[1]==401){
            redirectToLogin(history)
        }else{
            yield put(purchaseApiResponseError(GET_STORE_PURCHASE_VIEW, error[0]));
        }
    }
}

function* createPurchase({payload:{data, history}}) {
    try {
        const response = yield call (createPurchaseApi, data);
        yield put(puchaseApiResponseSuccess(CREATE_PURCHASE, response));

        localStorage.setItem("purchaseTransaction", JSON.stringify(response));
        history.push("/purchase-list");

    } catch(error) {

        if(error[1]==401){
            redirectToLogin(history)
        }else{
            yield put(purchaseApiResponseError(CREATE_PURCHASE, error[0]));
        }
    }
}


export function* watchGetPurchases() {
  yield takeEvery(GET_PURCHASE, getPurchases);
}

export function* watchCreatePurchase(){
    yield takeEvery(CREATE_PURCHASE, createPurchase);
}

export function* watchGetStorePurchaseView() {
    yield takeEvery(GET_STORE_PURCHASE_VIEW, getStorePurchaseView);
}




function* purchaseSaga() {

    
    yield all([
        fork(watchGetPurchases),
        fork(watchCreatePurchase),
        fork(watchGetStorePurchaseView),
    ]);
}

export default purchaseSaga;
