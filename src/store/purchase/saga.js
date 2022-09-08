import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { 
    GET_PURCHASE,
    CREATE_PURCHASE,
    GET_STORE_PURCHASE_VIEW,
    GET_PURCHASE_INVOICE,
    PURCHASE_TOGGLE_LOCK,
    PURCHASE_VERIFICATION,
    GET_PURCHASE_RETURN_LIST,
    GET_PURCHASE_RETURN_VARIATIONS,
    PURCHASE_RETURN_VERIFICATION,
    CREATE_PURCHASE_RETURN,
} from "./actionType";

import {
    puchaseApiResponseSuccess,
    purchaseApiResponseError,
} from "./action";

import {
    getPurchases as getPurchasesApi,
    createPurchase as createPurchaseApi,
    getStorePurchaseView as getStorePurchaseViewApi,
    getPurchaseInvoice as getPurchaseInvoiceApi,
    purchaseToggleLock as purchaseToggleLockApi,
    purchaseVerification as purchaseVerificationApi,
    getPurchaseReturnList as getPurchaseReturnListApi,
    getPurchaseReturnVariationsById as getPurchaseReturnVariationsByIdApi,
    purchaseReturnVerification as purchaseReturnVerificationApi,
    createPurchaseReturn as createPurchaseReturnApi,
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
        if(error[1] === 401){
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
        if(error[1] === 401){
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

        if(error[1] === 401){
            redirectToLogin(history)
        }else{
            yield put(purchaseApiResponseError(CREATE_PURCHASE, error[0]));
        }
    }
}

function* getPurchaseInvoice({ payload: {id, history} }){
    try{
        const response = yield call(getPurchaseInvoiceApi, id);
        localStorage.setItem("purchaseInvoice", true);
        yield put(puchaseApiResponseSuccess(GET_PURCHASE_INVOICE, response));
    }
    catch(error){
        if(error[1] === 401){
            redirectToLogin(history)
        }else{
            yield put(purchaseApiResponseError(GET_PURCHASE_INVOICE, error[0]));
        }
    }
}

function* purchaseToggleLock({ payload: {id, history} }){
    try{
        const response = yield call(purchaseToggleLockApi, id);
        localStorage.setItem("lock-status", true);
        yield put(puchaseApiResponseSuccess(PURCHASE_TOGGLE_LOCK, response));
    }
    catch(error){
        if(error[1] === 401){
            redirectToLogin(history)
        }else{
            yield put(purchaseApiResponseError(PURCHASE_TOGGLE_LOCK, error[0]));
        }
    }
}

function* purchaseVerification({payload:{data, history}}) {
    try {
        const response = yield call (purchaseVerificationApi, data);
        yield put(puchaseApiResponseSuccess(PURCHASE_VERIFICATION, response));

    } catch(error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }else{
            yield put(purchaseApiResponseError(PURCHASE_VERIFICATION, error[0]));
        }
    }
}

function*  getPurchaseReturnList({payload:{history}}) {
    try {
        const response =  yield call (getPurchaseReturnListApi);
        yield put(puchaseApiResponseSuccess(GET_PURCHASE_RETURN_LIST, response));
    } 
    catch (error) { 
        if(error[1] === 401){
            redirectToLogin(history)
        }else{
            yield put(purchaseApiResponseError(GET_PURCHASE_RETURN_LIST, error[0]));
        }
    }
}

function*  getPurchaseReturnVariationsById({payload:{id, history}}) {
    try {
        const response =  yield call (getPurchaseReturnVariationsByIdApi, id);
        localStorage.setItem('PurchaseReturnVariationById', true);
        yield put(puchaseApiResponseSuccess(GET_PURCHASE_RETURN_VARIATIONS, response));
    } 
    catch (error) { 
        if(error[1] === 401){
            redirectToLogin(history)
        }else{
            yield put(purchaseApiResponseError(GET_PURCHASE_RETURN_VARIATIONS, error[0]));
        }
    }
}

function*  purchaseReturnVerification({payload:{data, history}}) {
    try {
        const response =  yield call (purchaseReturnVerificationApi, data);
        yield put(puchaseApiResponseSuccess(PURCHASE_RETURN_VERIFICATION, response));
    } 
    catch (error) { 
        if(error[1] === 401){
            redirectToLogin(history)
        }else{
            yield put(purchaseApiResponseError(PURCHASE_RETURN_VERIFICATION, error[0]));
        }
    }
}

function*  createPurchaseReturn({payload:{data, history}}) {
    try {
        const response =  yield call (createPurchaseReturnApi, data);
        yield put(puchaseApiResponseSuccess(CREATE_PURCHASE_RETURN, response));
    } 
    catch (error) { 
        if(error[1] === 401){
            redirectToLogin(history)
        }else{
            yield put(purchaseApiResponseError(CREATE_PURCHASE_RETURN, error[0]));
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

export function* watchGetPurchaseInvoice() {
    yield takeEvery(GET_PURCHASE_INVOICE, getPurchaseInvoice);
}

export function* watchPurchaseToggleLock() {
    yield takeEvery(PURCHASE_TOGGLE_LOCK, purchaseToggleLock);
}

export function* watchPurchaseVerification() {
    yield takeEvery(PURCHASE_VERIFICATION, purchaseVerification);
}

export function* watchGetPurchaseReturnList() {
    yield takeEvery(GET_PURCHASE_RETURN_LIST, getPurchaseReturnList);
}

export function* watchGetPurchaseReturnVariationsById() {
    yield takeEvery(GET_PURCHASE_RETURN_VARIATIONS, getPurchaseReturnVariationsById);
}

export function* watchPurchaseReturnVerification() {
    yield takeEvery(PURCHASE_RETURN_VERIFICATION, purchaseReturnVerification);
}

export function* watchCreatePurchaseReturn() {
    yield takeEvery(CREATE_PURCHASE_RETURN, createPurchaseReturn);
}



function* purchaseSaga() {

    
    yield all([
        fork(watchGetPurchases),
        fork(watchCreatePurchase),
        fork(watchGetStorePurchaseView),
        fork(watchGetPurchaseInvoice),
        fork(watchPurchaseToggleLock),
        fork(watchPurchaseVerification),
        fork(watchGetPurchaseReturnList),
        fork(watchGetPurchaseReturnVariationsById),
        fork(watchPurchaseReturnVerification),
        fork(watchCreatePurchaseReturn),
    ]);
}

export default purchaseSaga;
