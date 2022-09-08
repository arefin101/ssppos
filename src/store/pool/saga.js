import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { 
    GET_POOL_HISTORY,
    UPDATE_POOL_HISTORY,
    DELETE_POOL_HISTORY,
    ADD_POOL,
    WITHDRAW_POOL,
} from "./actionType";

import {
    poolApiResponseSuccess,
    poolApiResponseError,
} from "./action";


import {
    getPoolHistory as getPoolHistoryApi,
    deletePoolHistory as deletePoolHistoryApi,
    updatePoolHistory as updatePoolHistoryApi,
    addPool as addPoolApi,
    withdrawPool as withdrawPoolApi,
} from "../../helpers/fakebackend_helper";



function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}


function* getPoolHistory({payload:{history}}) {

    try {
        const response = yield call(getPoolHistoryApi);
        yield put(poolApiResponseSuccess(GET_POOL_HISTORY, response));
    }catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(poolApiResponseError(GET_POOL_HISTORY , error[0]));
        }
    }  
}

function* deletePoolHistory({payload:{id, history}}) {

    try {
        const response = yield call(deletePoolHistoryApi, id);
        localStorage.setItem('delete', true);
        yield put(poolApiResponseSuccess(DELETE_POOL_HISTORY, response));
    }catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(poolApiResponseError(DELETE_POOL_HISTORY , error[0]));
        }
    }  
}

function* updatePoolHistory({payload:{id, data, history}}) {

    try {
        const response = yield call(updatePoolHistoryApi, id, data);
        yield put(poolApiResponseSuccess(UPDATE_POOL_HISTORY, response));
        localStorage.setItem('poolUpdate', true);
        history.push('/pool-history');
    }catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(poolApiResponseError(UPDATE_POOL_HISTORY , error[0]));
        }
    }  
}

function* addPool({payload:{history, data}}) {

    try {

        const response = yield call(addPoolApi, data);
        yield put(poolApiResponseSuccess(ADD_POOL, response));
        localStorage.setItem('poolAdd', response);
        history.push("/pool-history")

    }catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(poolApiResponseError(ADD_POOL , error[0]));
        }

    }  

}

function* withdrawPool({payload:{history, data}}) {

    try {

        const response = yield call(withdrawPoolApi, data);
        yield put(poolApiResponseSuccess(WITHDRAW_POOL, response));
        localStorage.setItem('poolWithdraw', response);
        history.push("/pool-history")

    }catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(poolApiResponseError(WITHDRAW_POOL , error[0]));
        }

    }  
}


export function* watchGetPoolHistory() {
    yield takeEvery(GET_POOL_HISTORY, getPoolHistory);
}
export function* watchDeletePoolHistory() {
    yield takeEvery(DELETE_POOL_HISTORY, deletePoolHistory);
}
export function* watchUpdatePoolHistory() {
    yield takeEvery(UPDATE_POOL_HISTORY, updatePoolHistory);
}

export function* watchAddPool() {
    yield takeEvery(ADD_POOL, addPool);
}

export function* watchWithdrawPool() {
    yield takeEvery(WITHDRAW_POOL, withdrawPool);
}


function* poolSaga() {
    yield all([
        fork(watchAddPool),
        fork(watchWithdrawPool),
        fork(watchGetPoolHistory),
        fork(watchUpdatePoolHistory),
        fork(watchDeletePoolHistory),
    ]);
}
export default poolSaga;