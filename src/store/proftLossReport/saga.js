import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { 
    GET_PROFIT_BY_CUSTOMER,
    GET_PROFIT_BY_SALE_INVOICE,
    GET_PROFIT_BY_CUSTOMER_VIEW,
    GET_PROFIT_BY_DATE,
    GET_PROFIT_BY_PRODUCTS,
    GET_PROFIT_BY_PRODUCT_CATAGORIES,
    GET_PROFIT_BY_PRODUCT_MODELS,
} from "./actionType";

import {
    ApiResponseSuccess,
    ApiResponseError,
} from "./action";


import {
    getProfitBySaleInvoice as getProfitBySaleInvoiceApi,
    getProfitByCustomer as getProfitByCustomerApi,
    getProfitByCustomerView as getProfitByCustomerViewApi,
    getProfitByDate as getProfitByDateApi,
    getProfitByProducts as getProfitByProductsApi,
    getProfitByProductModels as getProfitByProductModelsApi,
    getProfitByProductCatagories as getProfitByProductCatagoriesApi,
} from "../../helpers/fakebackend_helper";

function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}

function* getProfitBySaleInvoice({payload:{history}}) {

    try {
        const response = yield call(getProfitBySaleInvoiceApi);
        yield put(ApiResponseSuccess(GET_PROFIT_BY_SALE_INVOICE, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(ApiResponseError(GET_PROFIT_BY_SALE_INVOICE , error[0]));
        }
    } 
}

function* getProfitByCustomer({payload:{id, history}}) {

    try {
        const response = yield call(getProfitByCustomerApi, id);
        yield put(ApiResponseSuccess(GET_PROFIT_BY_CUSTOMER, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(ApiResponseError(GET_PROFIT_BY_CUSTOMER , error[0]));
        }
    } 
}

function* getProfitByCustomerView({payload:{history}}) {

    try {
        const response = yield call(getProfitByCustomerViewApi);
        yield put(ApiResponseSuccess(GET_PROFIT_BY_CUSTOMER_VIEW, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(ApiResponseError(GET_PROFIT_BY_CUSTOMER_VIEW , error[0]));
        }
    } 
}

function* getProfitByDate({payload:{history}}) {

    try {
        const response = yield call(getProfitByDateApi);
        yield put(ApiResponseSuccess(GET_PROFIT_BY_DATE, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(ApiResponseError(GET_PROFIT_BY_DATE , error[0]));
        }
    } 
}

function* getProfitByProducts({payload:{history}}) {

    try {
        const response = yield call(getProfitByProductsApi);
        yield put(ApiResponseSuccess(GET_PROFIT_BY_PRODUCTS, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(ApiResponseError(GET_PROFIT_BY_PRODUCTS , error[0]));
        }
    } 
}

function* getProfitByProductModels({payload:{history}}) {

    try {
        const response = yield call(getProfitByProductModelsApi);
        yield put(ApiResponseSuccess(GET_PROFIT_BY_PRODUCT_MODELS, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(ApiResponseError(GET_PROFIT_BY_PRODUCT_MODELS , error[0]));
        }
    } 
}

function* getProfitByProductCatagories({payload:{history}}) {

    try {
        const response = yield call(getProfitByProductCatagoriesApi);
        yield put(ApiResponseSuccess(GET_PROFIT_BY_PRODUCT_CATAGORIES, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(ApiResponseError(GET_PROFIT_BY_PRODUCT_CATAGORIES , error[0]));
        }
    } 
}



export function* watchGetProfitByCustomerView() {
    yield takeEvery(GET_PROFIT_BY_CUSTOMER_VIEW, getProfitByCustomerView);
}

export function* watchGetProfitByCustomer() {
    yield takeEvery(GET_PROFIT_BY_CUSTOMER, getProfitByCustomer);
}

export function* watchGetProfitBySaleInvoice() {
    yield takeEvery(GET_PROFIT_BY_SALE_INVOICE, getProfitBySaleInvoice);
}

export function* watchGetProfitByDate() {
    yield takeEvery(GET_PROFIT_BY_DATE, getProfitByDate);
}

export function* watchGetProfitByProducts() {
    yield takeEvery(GET_PROFIT_BY_PRODUCTS, getProfitByProducts);
}

export function* watchGetProfitByProductModels() {
    yield takeEvery(GET_PROFIT_BY_PRODUCT_MODELS, getProfitByProductModels);
}

export function* watchGetProfitByProductCatagories() {
    yield takeEvery(GET_PROFIT_BY_PRODUCT_CATAGORIES, getProfitByProductCatagories);
}



function* profitLossReportSaga() {
    yield all([
        fork(watchGetProfitByCustomer),
        fork(watchGetProfitByCustomerView),
        fork(watchGetProfitBySaleInvoice),
        fork(watchGetProfitByDate),
        fork(watchGetProfitByProducts),
        fork(watchGetProfitByProductModels),
        fork(watchGetProfitByProductCatagories),
    ]);
}
export default profitLossReportSaga;