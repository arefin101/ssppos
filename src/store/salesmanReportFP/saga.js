import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { 
    GET_COMMISSION_BY_SALE_INVOICE_FP,
    GET_SALES_DUE_FP,
    GET_COMISSION_BY_RETURN_INVOICE_FP,
    GET_COMMISSION_BY_CUSTOMER,
} from "./actionType";

import {
    FPApiResponseSuccess,
    FPApiResponseError,
} from "./action";


import {
    getSaleInvoiceFp as getSaleInvoiceFpApi,
    getSalesDueFPView as getSalesDueFPViewApi,
    getComissionByReturnInvoiceFPView as getComissionByReturnInvoiceFPViewApi,
    getCommissionByCustomerFp as getCommissionByCustomerApi,
} from "../../helpers/fakebackend_helper";


function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}


function* getSaleInvoiceFp({payload:{data, history}}) {
    try {
        const response = yield call(getSaleInvoiceFpApi, data);
        yield put(FPApiResponseSuccess(GET_COMMISSION_BY_SALE_INVOICE_FP, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(FPApiResponseError(GET_COMMISSION_BY_SALE_INVOICE_FP , error[0]));
        }
    } 
}

function* getSalesDueFPView({payload:{history}}) {
    try {
        const response = yield call(getSalesDueFPViewApi);
        yield put(FPApiResponseSuccess(GET_SALES_DUE_FP, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(FPApiResponseError(GET_SALES_DUE_FP , error[0]));
        }
    } 
}


function* getComissionByReturnInvoiceFPView({payload:{history}}) {
    try {
        const response = yield call(getComissionByReturnInvoiceFPViewApi);
        yield put(FPApiResponseSuccess(GET_COMISSION_BY_RETURN_INVOICE_FP, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(FPApiResponseError(GET_COMISSION_BY_RETURN_INVOICE_FP , error[0]));
        }
    } 
}


function* getCommissionByCustomer({ payload: { history } }) {
    try {

        const response = yield call(getCommissionByCustomerApi);
        yield put(FPApiResponseSuccess(GET_COMMISSION_BY_CUSTOMER, response));

    } catch (error) {
    
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(FPApiResponseError(GET_COMMISSION_BY_CUSTOMER, error[0]));
        }
    } 
}

export function* watchGetSaleInvoiceFp() {
    yield takeEvery(GET_COMMISSION_BY_SALE_INVOICE_FP, getSaleInvoiceFp);
}

export function* watchGetCommissionByCustomer() {
    yield takeEvery(GET_COMMISSION_BY_CUSTOMER, getCommissionByCustomer);
}

export function* watchGetSalesDueFPView() {
    yield takeEvery(GET_SALES_DUE_FP, getSalesDueFPView);
}

export function* watchGetComissionByReturnInvoiceFPView() {
    yield takeEvery(GET_COMISSION_BY_RETURN_INVOICE_FP, getComissionByReturnInvoiceFPView);
}


function* ReportFPSaga() {
    yield all([
        fork(watchGetSaleInvoiceFp),
        fork(watchGetSalesDueFPView),
        fork(watchGetComissionByReturnInvoiceFPView),
        fork(watchGetCommissionByCustomer),
    ]);
}
export default ReportFPSaga;