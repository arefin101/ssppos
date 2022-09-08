import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { 
    IMEI_SEARCH,
} from "./actionType";

import {
    searchApiResponseSuccess,
    searchApiResponseError,
} from "./action";


import {
    imeiSearch as imeiSearchApi,
} from "../../helpers/fakebackend_helper";



function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}



function* imeiSearch({payload:{imei, history}}) {

    try {
        const response = yield call(imeiSearchApi, imei);
        yield put(searchApiResponseSuccess(IMEI_SEARCH, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(searchApiResponseError(IMEI_SEARCH , error[0]));
        }
    } 
}



export function* watchImeiSearch() {
    yield takeEvery(IMEI_SEARCH, imeiSearch);
}



function* searchSaga() {
    yield all([
        fork(watchImeiSearch),
    ]);
}
export default searchSaga;