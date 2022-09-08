import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { 
    GET_PRODUCTS_ON_HAND,
    GET_PRODUCTS_ON_HAND_VARIATIONS,
    GET_PRODUCT_TRANSFER_HISTORY,
    GET_PRODUCT_TRANSFER_VIEW,
    GET_PRODUCT_TRANSFER_HISTORY_DETAILS,
    CREATE_PRODUCT_TRANSFER,
    GET_PURCHASE_INVOICE_LIST,
    GET_LAST_TRANSACTION,
    GET_PRODUCT_BY_PURCHASE_INVOICE,
    GET_PRODUCT_BY_LAST_TRANSACTION,
    GET_PRODUCT_BY_IMEI_SCAN,
} from "./actionType";

import {
    productLocationApiResponseSuccess,
    productLocationApiResponseError,
} from "./action";

import {
    getProductsOnHand as getProductsOnHandApi,
    getProductsOnHandVariations as getProductsOnHandVariationsApi,
    getProductTransferView as getProductTransferViewApi,
    getProductTransferHistory as getProductTransferHistoryApi,
    getProductTransferHistoryDetails as getProductTransferHistoryDetailsApi,
    productTransfer as productTransferApi,
    getPurchaseInvoiceList as getPurchaseInvoiceListApi,
    getLastTrinsaction as getLastTrinsactionApi,
    getProductsByPurchaseInvoice as getProductsByPurchaseInvoiceApi,
    getProductsByLastTransaction as getProductsByLastTransactionApi,
    getProductByImeiScan as getProductByImeiScanApi,

} from "../../helpers/fakebackend_helper";

function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}

function* getProductsOnHand({payload:{history}}) {
   
    try {
        const response = yield call(getProductsOnHandApi);
        yield put(productLocationApiResponseSuccess(GET_PRODUCTS_ON_HAND, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(productLocationApiResponseError(GET_PRODUCTS_ON_HAND, error[0]));
        }
    }
}

function* getProductsOnHandVariations({payload:{id, history}}) {
   
    try {
        const response = yield call(getProductsOnHandVariationsApi, id);
        localStorage.setItem("variations", true);
        yield put(productLocationApiResponseSuccess(GET_PRODUCTS_ON_HAND_VARIATIONS, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(productLocationApiResponseError(GET_PRODUCTS_ON_HAND_VARIATIONS , error[0]));
        }
    }
}

function* getProductTransferView({payload:{history}}) {
   
    try {
        const response = yield call(getProductTransferViewApi);
        yield put(productLocationApiResponseSuccess(GET_PRODUCT_TRANSFER_VIEW, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(productLocationApiResponseError(GET_PRODUCT_TRANSFER_VIEW , error[0]));
        }
    }
}

function* getProductTransferHistory({payload:{history}}) {
   
    try {
        const response = yield call(getProductTransferHistoryApi);
        yield put(productLocationApiResponseSuccess(GET_PRODUCT_TRANSFER_HISTORY, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(productLocationApiResponseError(GET_PRODUCT_TRANSFER_HISTORY , error[0]));
        }
    }
}

function* getProductTransferHistoryDetails({payload:{id, history}}) {
   
    try {
        const response = yield call(getProductTransferHistoryDetailsApi, id);
        localStorage.setItem("history details", true);
        yield put(productLocationApiResponseSuccess(GET_PRODUCT_TRANSFER_HISTORY_DETAILS, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(productLocationApiResponseError(GET_PRODUCT_TRANSFER_HISTORY_DETAILS, error[0]));
        }
    }
}

function* productTransfer({payload:{ data , history } }) {

    try {
        const response =  yield call(productTransferApi, data);
        yield put(productLocationApiResponseSuccess(CREATE_PRODUCT_TRANSFER, response));
        localStorage.setItem("Product Transfer", true);
        history.push("/product-history");
    }
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(productLocationApiResponseError(CREATE_PRODUCT_TRANSFER, error[0]));
        }
    } 

}

function* getPurchaseInvoiceList({payload:{history}}) {
   
    try {
        const response = yield call(getPurchaseInvoiceListApi);
        // console.log(response)
        yield put(productLocationApiResponseSuccess(GET_PURCHASE_INVOICE_LIST, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(productLocationApiResponseError(GET_PURCHASE_INVOICE_LIST , error[0]));
        }
    }
}
function* getLastTransactions({payload:{history}}) {
   
    try {
        const response = yield call(getLastTrinsactionApi);
        // console.log(response)
        yield put(productLocationApiResponseSuccess(GET_LAST_TRANSACTION, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(productLocationApiResponseError(GET_LAST_TRANSACTION , error[0]));
        }
    }
}

function* getProductsByPurchaseInvoice({payload:{ id , history } }) {

    try {
        const response =  yield call(getProductsByPurchaseInvoiceApi, id);

        yield put(productLocationApiResponseSuccess(GET_PRODUCT_BY_PURCHASE_INVOICE, response));
    }
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(productLocationApiResponseError(GET_PRODUCT_BY_PURCHASE_INVOICE, error[0]));
        }
    } 

}

function* getProductsByLastTransaction({payload:{ id , history } }) {

    try {
        const response =  yield call(getProductsByLastTransactionApi, id);
        // console.log(11111,response);
        yield put(productLocationApiResponseSuccess(GET_PRODUCT_BY_LAST_TRANSACTION, response));
    }
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(productLocationApiResponseError(GET_PRODUCT_BY_LAST_TRANSACTION, error[0]));
        }
    } 
}

function* getProductByImeiScan({payload:{ imei, history } }) {

    try {
        const response =  yield call(getProductByImeiScanApi, imei);
        localStorage.setItem('product', true);
        yield put(productLocationApiResponseSuccess(GET_PRODUCT_BY_IMEI_SCAN, response));
    }
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(productLocationApiResponseError(GET_PRODUCT_BY_IMEI_SCAN, error[0]));
        }
    } 
}



export function* watchGetProductsOnHand() {
    yield takeEvery(GET_PRODUCTS_ON_HAND, getProductsOnHand);
}

export function* watchGetProductsOnHandVariations() {
    yield takeEvery(GET_PRODUCTS_ON_HAND_VARIATIONS, getProductsOnHandVariations);
}

export function* watchGetProductTransferView() {
    yield takeEvery(GET_PRODUCT_TRANSFER_VIEW, getProductTransferView);
}

export function* watchGetProductTransferHistory() {
    yield takeEvery(GET_PRODUCT_TRANSFER_HISTORY, getProductTransferHistory);
}

export function* watchGetProductTransferHistoryDetails() {
    yield takeEvery(GET_PRODUCT_TRANSFER_HISTORY_DETAILS, getProductTransferHistoryDetails);
}

export function* watchProductTransfer(){
    yield takeEvery(CREATE_PRODUCT_TRANSFER, productTransfer);
}

export function* watchGetPurchaseInvoiceList() {
    yield takeEvery(GET_PURCHASE_INVOICE_LIST, getPurchaseInvoiceList);
}

export function* watchGetLastTransactions() {
    yield takeEvery(GET_LAST_TRANSACTION, getLastTransactions);
}

export function* watchGetProductsByPurchaseInvoice() {
    yield takeEvery(GET_PRODUCT_BY_PURCHASE_INVOICE, getProductsByPurchaseInvoice);
}

export function* watchGetProductsByLastTransaction() {
    yield takeEvery(GET_PRODUCT_BY_LAST_TRANSACTION, getProductsByLastTransaction);
}

export function* watchGetProductsByImeiScan() {
    yield takeEvery(GET_PRODUCT_BY_IMEI_SCAN, getProductByImeiScan);
}



function* productLocationSaga() {

    yield all([
        fork(watchGetProductsOnHand),
        fork(watchGetProductsOnHandVariations),
        fork(watchGetProductTransferView),
        fork(watchGetProductTransferHistory),
        fork(watchGetProductTransferHistoryDetails),
        fork(watchProductTransfer),
        fork(watchGetPurchaseInvoiceList),
        fork(watchGetLastTransactions),
        fork(watchGetProductsByPurchaseInvoice),
        fork(watchGetProductsByLastTransaction),
        fork(watchGetProductsByImeiScan),
    ]);

}
export default productLocationSaga;