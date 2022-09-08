import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { 
    GET_CAS_INDEX,
    GET_CAS_INDEX_VIEW,
    GET_SAS_INDEX,
    GET_SAS_INDEX_VIEW,
    GET_SPR_INDEX,
    GET_PPR_INDEX,
    GET_EPR_INDEX,
    GET_VERIFICATION_REPORT_LIST,
} from "./actionType";

import {
    reportApiResponseSuccess,
    reportApiResponseError,
} from "./action";


import {
    getCasIndex as getCasIndexApi,
    getCasIndexView as getCasIndexViewApi,
    getSasIndex as getSasIndexApi,
    getSasIndexView as getSasIndexViewApi,
    getSprIndex as getSprIndexApi,
    getPprIndex as getPprIndexApi,
    getEprIndex as getEprIndexApi,
    getVerificationReportList as getVerificationReportListApi,
    
} from "../../helpers/fakebackend_helper";

function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}

function* getCasIndex({payload:{id, history}}) {

    try {
        const response = yield call(getCasIndexApi, id);
        localStorage.setItem("CasIndex", true);
        yield put(reportApiResponseSuccess(GET_CAS_INDEX, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history);
        }
        else{
            yield put(reportApiResponseError(GET_CAS_INDEX , error[0]));
        }
    } 
}

function* getCasIndexView({payload:{history}}) {

    try {
        const response = yield call(getCasIndexViewApi);
        yield put(reportApiResponseSuccess(GET_CAS_INDEX_VIEW, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(reportApiResponseError(GET_CAS_INDEX_VIEW , error[0]));
        }
    } 
}

function* getSasIndex({payload:{id, history}}) {

    try {
        const response = yield call(getSasIndexApi, id);
        localStorage.setItem("SasIndex", true);
        yield put(reportApiResponseSuccess(GET_SAS_INDEX, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history);
        }
        else{
            yield put(reportApiResponseError(GET_SAS_INDEX , error[0]));
        }
    } 
}

function* getSasIndexView({payload:{history}}) {

    try {
        const response = yield call(getSasIndexViewApi);
        yield put(reportApiResponseSuccess(GET_SAS_INDEX_VIEW, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(reportApiResponseError(GET_SAS_INDEX_VIEW , error[0]));
        }
    } 
}

function* getSprIndex({payload:{history}}) {

    try {
        const response = yield call(getSprIndexApi);
        yield put(reportApiResponseSuccess(GET_SPR_INDEX, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(reportApiResponseError(GET_SPR_INDEX , error[0]));
        }
    } 
}

function* getPprIndex({payload:{history}}) {

    try {
        const response = yield call(getPprIndexApi);
        yield put(reportApiResponseSuccess(GET_PPR_INDEX, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(reportApiResponseError(GET_PPR_INDEX , error[0]));
        }
    } 
}

function* getEprIndex({payload:{history}}) {

    try {
        const response = yield call(getEprIndexApi);
        yield put(reportApiResponseSuccess(GET_EPR_INDEX, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(reportApiResponseError(GET_EPR_INDEX , error[0]));
        }
    } 
}

function* getVerificationReportList({payload:{history}}) {

    try {
        const response = yield call(getVerificationReportListApi);
        yield put(reportApiResponseSuccess(GET_VERIFICATION_REPORT_LIST, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(reportApiResponseError(GET_VERIFICATION_REPORT_LIST , error[0]));
        }
    } 
}



export function* watchGetCasIndex() {
    yield takeEvery(GET_CAS_INDEX, getCasIndex);
}
export function* watchGetCasIndexView() {
    yield takeEvery(GET_CAS_INDEX, getCasIndexView);
}
export function* watchGetSasIndex() {
    yield takeEvery(GET_SAS_INDEX, getSasIndex);
}
export function* watchGetSasIndexView() {
    yield takeEvery(GET_SAS_INDEX, getSasIndexView);
}
export function* watchGetSprIndex() {
    yield takeEvery(GET_SPR_INDEX, getSprIndex);
}
export function* watchGetPprIndex() {
    yield takeEvery(GET_PPR_INDEX, getPprIndex);
}
export function* watchGetEprIndex() {
    yield takeEvery(GET_EPR_INDEX, getEprIndex);
}
export function* watchGetVerificationReportList() {
    yield takeEvery(GET_VERIFICATION_REPORT_LIST, getVerificationReportList);
}



function* reportSaga() {
    yield all([
        fork(watchGetCasIndex),
        fork(watchGetCasIndexView),
        fork(watchGetSasIndex),
        fork(watchGetSasIndexView),
        fork(watchGetSprIndex),
        fork(watchGetPprIndex),
        fork(watchGetEprIndex),
        fork(watchGetVerificationReportList),
    ]);
}
export default reportSaga;