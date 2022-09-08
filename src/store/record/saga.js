import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { 
    GET_CASH_IN_RECORDS,
    GET_CASH_OUT_RECORDS,
    GET_TRANSACTION_RECORDS,
    GET_VERIFICATION_RECORD,
    GET_USER_LOG,
} from "./actionType";

import {
    recordApiResponseSuccess,
    recordApiResponseError,
} from "./action";


import {
    getTransactionRecords as getTransactionRecordsApi,
    getCashInRecords as getCashInRecordsApi,
    getCashOutRecords as getCashOutRecordsApi,
    getVerificationRecord as getVerificationRecordApi,
    getUserLog as getUserLogApi,
} from "../../helpers/fakebackend_helper";



function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}



function* getTransactionRecords({payload:{history}}) {

    try {
        const response = yield call(getTransactionRecordsApi);
        yield put(recordApiResponseSuccess(GET_TRANSACTION_RECORDS, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(recordApiResponseError(GET_TRANSACTION_RECORDS , error[0]));
        }
    } 
}

function* getCashInRecords({payload:{history}}) {

    try {
        const response = yield call(getCashInRecordsApi);
        yield put(recordApiResponseSuccess(GET_CASH_IN_RECORDS, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(recordApiResponseError(GET_CASH_IN_RECORDS , error[0]));
        }
    } 
}

function* getCashOutRecords({payload:{history}}) {

    try {
        const response = yield call(getCashOutRecordsApi);
        yield put(recordApiResponseSuccess(GET_CASH_OUT_RECORDS, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(recordApiResponseError(GET_CASH_OUT_RECORDS , error[0]));
        }
    } 
}

function* getVerificationRecord({payload:{history}}) {
    try {
        const response = yield call(getVerificationRecordApi);
        yield put(recordApiResponseSuccess(GET_VERIFICATION_RECORD, response));
    } catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        } 
        else{
            yield put(recordApiResponseError(GET_VERIFICATION_RECORD , error[0]));
        }
    }
}

function* getUserLog({payload:{history}}) {
    try {
        const response = yield call(getUserLogApi);
        yield put(recordApiResponseSuccess(GET_USER_LOG, response));
    } catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        } 
        else{
            yield put(recordApiResponseError(GET_USER_LOG , error[0]));
        }
    }
}



export function* watchGetTransactionRecords() {
    yield takeEvery(GET_TRANSACTION_RECORDS, getTransactionRecords);
}
export function* watchGetCashInRecords() {
    yield takeEvery(GET_CASH_IN_RECORDS, getCashInRecords);
}
export function* watchGetCashOutRecords() {
    yield takeEvery(GET_CASH_OUT_RECORDS, getCashOutRecords);
}
export function* watchGetVerificationRecord() {
    yield takeEvery(GET_VERIFICATION_RECORD, getVerificationRecord);
}

export function* watchGetUserLog() {
    yield takeEvery(GET_USER_LOG, getUserLog)
}



function* recordSaga() {
    yield all([
        fork(watchGetTransactionRecords),
        fork(watchGetCashInRecords),
        fork(watchGetCashOutRecords),
        fork(watchGetVerificationRecord),
        fork(watchGetUserLog),
    ]);
}
export default recordSaga;