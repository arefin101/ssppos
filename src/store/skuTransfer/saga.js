import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import {
    GET_SKU_TRANSFER_VIEW_DATA,
    GET_SKU_TRANSFER_STORE_DATA,
    SKU_TRANSFER,
    SKU_TRANSFER_HISTORY,
    SKU_TRANSFER_HISTORY_DETAILS,
} from "./actionType";

import { SkuTransferApiResponseSuccess, SkuTransferApiResponseError } from "./action";


import {
    getSkuTransferViewData as getSkuTransferViewDataApi,
    getSkuTransferViewStore as getSkuTransferViewStoreApi,
    skuTransfer as skuTransferApi,
    getSkuTransferHistory as getSkuTransferHistoryApi,
    getHistoryDetails as getHistoryDetailsApi,
} from "../../helpers/fakebackend_helper";


function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}


function* getSkuTransferViewData({ payload: { history } }) {
    try {
        const response = yield call(getSkuTransferViewDataApi);
        yield put(SkuTransferApiResponseSuccess(GET_SKU_TRANSFER_VIEW_DATA, response));
    
    } catch (error) {

        if(error[1]===401){
            redirectToLogin(history)
        }
        else{
            yield put(SkuTransferApiResponseError(GET_SKU_TRANSFER_VIEW_DATA, error[0]));
        }
    }
}

function* getSkuTransferViewStore({ payload: { history, id } }) {
    try {
        const response = yield call(getSkuTransferViewStoreApi, id);
        localStorage.setItem('view_store_data', true);
        yield put(SkuTransferApiResponseSuccess(GET_SKU_TRANSFER_STORE_DATA, response));
    
    } catch (error) {

        if(error[1]===401){
            redirectToLogin(history)
        }
        else{
            yield put(SkuTransferApiResponseError(GET_SKU_TRANSFER_STORE_DATA, error[0]));
        }
    }
}

function* skuTransfer({ payload: { history, data } }) {
    try {

        const response = yield call(skuTransferApi, data);
        yield put(SkuTransferApiResponseSuccess(SKU_TRANSFER, response));
        localStorage.setItem('sku_transfer', true);
        history.push("/sku-transfer-history")
    
    } catch (error) {

        if(error[1]===401){
            redirectToLogin(history)
        }
        else{
            yield put(SkuTransferApiResponseError(SKU_TRANSFER, error[0]));
        }
    }
}

function* getSkuTransferHistory({ payload: { history } }) {
    try {

        const response = yield call(getSkuTransferHistoryApi);
        yield put(SkuTransferApiResponseSuccess(SKU_TRANSFER_HISTORY, response));
    
    } catch (error) {

        if(error[1]===401){
            redirectToLogin(history)
        }
        else{
            yield put(SkuTransferApiResponseError(SKU_TRANSFER_HISTORY, error[0]));
        }
    }
}

function* getHistoryDetails({ payload: { batch_no, history } }) {
    try {

        const response = yield call(getHistoryDetailsApi, batch_no);
        localStorage.setItem('history_details', true);
        yield put(SkuTransferApiResponseSuccess(SKU_TRANSFER_HISTORY_DETAILS, response));
    
    } catch (error) {

        if(error[1]===401){
            redirectToLogin(history)
        }
        else{
            yield put(SkuTransferApiResponseError(SKU_TRANSFER_HISTORY_DETAILS, error[0]));
        }
    }
}


export function* watchGetSkuTransferViewData() {
    yield takeEvery(GET_SKU_TRANSFER_VIEW_DATA, getSkuTransferViewData);
}

export function* watchGetSkuTransferViewStore() {
    yield takeEvery(GET_SKU_TRANSFER_STORE_DATA, getSkuTransferViewStore);
}

export function* watchSkuTransfer() {
    yield takeEvery(SKU_TRANSFER, skuTransfer);
}

export function* watchGetSkuTransferHistory() {
    yield takeEvery(SKU_TRANSFER_HISTORY, getSkuTransferHistory);
}

export function* watchGetHistoryDetails() {
    yield takeEvery(SKU_TRANSFER_HISTORY_DETAILS, getHistoryDetails);
}


function* skuTransferSaga() {
    yield all([
            fork(watchGetSkuTransferViewData),
            fork(watchGetSkuTransferViewStore),
            fork(watchSkuTransfer),
            fork(watchGetSkuTransferHistory),
            fork(watchGetHistoryDetails),
        ]);
}

export default skuTransferSaga;
