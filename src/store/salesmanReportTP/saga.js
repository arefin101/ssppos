import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { 
    GET_COMMISSION_BY_CUSTOMER_TP,
    GET_SALESMAN_DROPDOWN,
    GET_COMMISSION_BY_SALE_INVOICE_TP,
    GET_SALES_DUE_TP,
    GET_COMM_BY_RETURN_INVOICE_TP,
    GET_COMMISSION_SUMMARY,
    SALES_DUE_SUMMARY,
} from "./actionType";


import {
    TPApiResponseSuccess,
    TPApiResponseError,
} from "./action";


import {
    getCommissionByCustomerTp as getCommissionByCustomerApi,
    getSalesmanDropdown as getSalesmanDropdownApi,
    getSaleInvoiceTp as getSaleInvoiceTpApi,
    getSalesDueTp as getSalesDueTpApi,
    getCommByReturnInvoiceTp as getCommByReturnInvoiceTpApi,
    getCommissionSummary as getCommissionSummaryApi,
    getSalesDueSummary as getSalesDueSummaryApi,
} from "../../helpers/fakebackend_helper";


function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}


function* getSalesmanDropdown({payload:{history}}) {
    try {
        const response = yield call(getSalesmanDropdownApi);
        yield put(TPApiResponseSuccess(GET_SALESMAN_DROPDOWN, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(TPApiResponseError(GET_SALESMAN_DROPDOWN , error[0]));
        }
    } 
}

function* getCommissionSummary({payload:{history}}) {
    try {
        const response = yield call(getCommissionSummaryApi);
        yield put(TPApiResponseSuccess(GET_COMMISSION_SUMMARY, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(TPApiResponseError(GET_COMMISSION_SUMMARY , error[0]));
        }
    } 
}

function* getSalesDueSummary({payload:{history}}) {
    try {
        const response = yield call(getSalesDueSummaryApi);
        yield put(TPApiResponseSuccess(SALES_DUE_SUMMARY, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(TPApiResponseError(SALES_DUE_SUMMARY , error[0]));
        }
    } 
}

function* getCommissionByCustomerTp({ payload: { data, history } }) {
    try {

        const response = yield call(getCommissionByCustomerApi, data);
        localStorage.setItem("salesMan", true);
        yield put(TPApiResponseSuccess(GET_COMMISSION_BY_CUSTOMER_TP, response));

    } catch (error) {
    
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(TPApiResponseError(GET_COMMISSION_BY_CUSTOMER_TP, error[0]));
        }
    } 
}

function* getSaleInvoiceTP({payload:{id, data, history}}) {
    try {
        const response = yield call(getSaleInvoiceTpApi, id, data);
        yield put(TPApiResponseSuccess(GET_COMMISSION_BY_SALE_INVOICE_TP, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(TPApiResponseError(GET_COMMISSION_BY_SALE_INVOICE_TP , error[0]));
        }
    } 
}


function* getSalesDueTp({payload:{id, history}}) {

    try {
        const response = yield call(getSalesDueTpApi, id);
        localStorage.setItem("SalesDue", true);
        yield put(TPApiResponseSuccess(GET_SALES_DUE_TP, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(TPApiResponseError(GET_SALES_DUE_TP , error[0]));
        }
    } 
}


function* getCommByReturnInvoiceTp({payload:{id, history}}) {

    try {
        const response = yield call(getCommByReturnInvoiceTpApi, id);
        localStorage.setItem("commByReturnInvoice", true);
        yield put(TPApiResponseSuccess(GET_COMM_BY_RETURN_INVOICE_TP, response));
    }
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(TPApiResponseError(GET_COMM_BY_RETURN_INVOICE_TP , error[0]));
        }
    } 
}




export function* watchGetSaleInvoiceTp() {
    yield takeEvery(GET_COMMISSION_BY_SALE_INVOICE_TP, getSaleInvoiceTP);
}

export function* watchGetCommissionByCustomerTp() {
    yield takeEvery(GET_COMMISSION_BY_CUSTOMER_TP, getCommissionByCustomerTp);
}

export function* watchGetCommByReturnInvoiceTp() {
    yield takeEvery(GET_COMM_BY_RETURN_INVOICE_TP, getCommByReturnInvoiceTp);
}

export function* watchGetSalesDueTp() {
    yield takeEvery(GET_SALES_DUE_TP, getSalesDueTp);
}

export function* watchGetSalesmanDropdown() {
    yield takeEvery(GET_SALESMAN_DROPDOWN, getSalesmanDropdown);
}

export function* watchGetCommissionSummary() {
    yield takeEvery(GET_COMMISSION_SUMMARY, getCommissionSummary);
}

export function* watchGetSalesDueSummary() {
    yield takeEvery(SALES_DUE_SUMMARY, getSalesDueSummary);
}




function* ReportTPSaga() {
    yield all([
        fork(watchGetCommissionByCustomerTp),
        fork(watchGetSalesmanDropdown),
        fork(watchGetSaleInvoiceTp),
        fork(watchGetSalesDueTp),
        fork(watchGetCommByReturnInvoiceTp),
        fork(watchGetCommissionSummary),
        fork(watchGetSalesDueSummary),
    ]);
}


export default ReportTPSaga;