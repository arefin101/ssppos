import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// general Redux States
import {HAS_PERMISSION} from "./actionType";


import {
    generalApiResponseSuccess,
    generalApiResponseError,
} from "./action";

//Include Both Helper File with needed methods
import {
    hasPermission as hasPermissionApi,
} from "../../helpers/fakebackend_helper";

 function redirectToLogin(history){
    localStorage.clear()
    history.push("/login")
}

function* hasPermission({payload:{permissionName , history}}){
    try {
        // console.log(permissionName)
        const response =  yield call(hasPermissionApi, permissionName);
        // console.log(response)
        yield put(generalApiResponseSuccess(HAS_PERMISSION , response));
        
    } catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(generalApiResponseError(HAS_PERMISSION, error[0]));
        }
    }
}

export function* watchHasPermission(){
    yield takeEvery(HAS_PERMISSION , hasPermission)
}

function* generalSaga() {

    
    yield all([
        fork(watchHasPermission)
    ]);
}

export default generalSaga;