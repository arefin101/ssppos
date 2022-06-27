import { call, put, takeEvery, all, fork } from "redux-saga/effects";



import { 
    IMEI_SCAN, 
    GET_SALE_LIST,
    CREATE_SALE_TRANSACTION,
    GET_STORE_SALE_VIEW,
} from "./actionType";



import {
    saleApiResponseSuccess,
    saleApiResponseError,
} from "./action";



import { 
    imeiScan as imeiScanApi,
    getSaleList as getSaleListApi,
    createSaleTransaction as createSaleTransactionApi,
    getStoreSaleView as getStoreSaleViewApi,
} from "../../helpers/fakebackend_helper";



function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}

function* imeiScan({ payload:{ imei, history } }) {
    try {
        const response =  yield call(imeiScanApi, imei);
        localStorage.setItem("imeiScanSuccess", true);
        yield put(saleApiResponseSuccess( IMEI_SCAN, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history);
        }
        else{
            localStorage.setItem("imeiScanError", true);
            yield put(saleApiResponseError( IMEI_SCAN, error[0]));
        }
    }
}

function* getSaleList({ payload: { history } }) {
    try {
        const response = yield call(getSaleListApi);
        yield put(saleApiResponseSuccess(GET_SALE_LIST, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(saleApiResponseError(GET_SALE_LIST, error[0]));
        }
    } 
}

function* getStoreSaleView({ payload: { history } }) {
    try {
        const response = yield call(getStoreSaleViewApi);
        yield put(saleApiResponseSuccess(GET_STORE_SALE_VIEW, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(saleApiResponseError(GET_STORE_SALE_VIEW, error[0]));
        }
    } 
}

function* createSaleTransaction({ payload: {data, history}}) {
    try {
        const response = yield call(createSaleTransactionApi, data);
        localStorage.setItem("createSaleTransactionSuccess", true);
        yield put(saleApiResponseSuccess(CREATE_SALE_TRANSACTION, response));
        history.push("/sale-list")
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history);
        }
        else{
            yield put(saleApiResponseError(CREATE_SALE_TRANSACTION, error[0]));
        }
    }
}
     


export function* watchImeiScan(){
    yield takeEvery(IMEI_SCAN, imeiScan);
}

export function* watchGetSaleList(){
    yield takeEvery(GET_SALE_LIST, getSaleList);
}

export function* watchCreateSaleTransaction(){
    yield takeEvery(CREATE_SALE_TRANSACTION, createSaleTransaction);
}

export function* watchGetStoreSaleView(){
    yield takeEvery(GET_STORE_SALE_VIEW, getStoreSaleView);
}



function* saleSaga() {  
    yield all([
        fork(watchImeiScan),
        fork(watchGetSaleList),
        fork(watchCreateSaleTransaction),
        fork(watchGetStoreSaleView),
    ]);
}



export default saleSaga;
