import { call, put, takeEvery, all, fork } from "redux-saga/effects";


import { 
    GET_ROLE, 
    CREATE_ROLE, 
    GET_PERMISSION, 
    ASSIGN_PERMISSION, 
    GET_ROLE_PERMISSION_SELECT
} from "./actionType";


import {
    roleApiResponseSuccess,
    roleApiResponseError,
} from "./action";


import {
    getRoles as getRolesApi,
    createRole as createRoleApi,
    getPermissions as getPermissionsApi,
    assignPermission as assignPermissionApi,
    getRolePermission as getRolePermissionApi,
} from "../../helpers/fakebackend_helper";


function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}


function*  getRoles({payload:{history}}) {
    
    try {
        const response =  yield call (getRolesApi);
        yield put(roleApiResponseSuccess(GET_ROLE, response));
    } 
    catch (error) { 
        
        if(error[1] === 401){
            redirectToLogin(history)
        }else{
            yield put(roleApiResponseError(GET_ROLE, error[0]));
        }
    }

}


function*  getRolePermission() {

    try {
        const response =  yield call (getRolePermissionApi);
        yield put(roleApiResponseSuccess(GET_ROLE_PERMISSION_SELECT, response));
    } 
    catch (error) { 

        yield put(roleApiResponseError(GET_ROLE_PERMISSION_SELECT, error[0]));

    }
}


function*  getPermission({payload:{id, history}}) {
    
    try {
        const response =  yield call (getPermissionsApi,id);
        yield put(roleApiResponseSuccess(GET_PERMISSION, response));
    } 
    catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(roleApiResponseError(GET_PERMISSION, error[0]));
        }
    }
}


function*  assignPermissions({payload:{data, history}}) {

    try {
        const response =  yield call(assignPermissionApi,data);
        yield put(roleApiResponseSuccess(ASSIGN_PERMISSION, response));

        localStorage.setItem("permission_message", JSON.stringify(response.message));
        history.push("/role-List");
    } 
    catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            localStorage.setItem("permission_message_error", JSON.stringify(error));
            yield put(roleApiResponseError(ASSIGN_PERMISSION, error[0]));
        }

    }

}


function* createRole({ payload:{ role ,history} }) {

    try {
        const response =  yield call(createRoleApi, role);
        localStorage.setItem("role", JSON.stringify(response));

        yield put(roleApiResponseSuccess(CREATE_ROLE, response));
        history.push("/role-List");
    } 
    catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(roleApiResponseError(CREATE_ROLE, error[0]));
        }
        
    }

}


export function* watchCreateRole(){
    yield takeEvery(CREATE_ROLE, createRole);
}

export function* watchGetPermission(){
    yield takeEvery(GET_PERMISSION, getPermission);
}

export function* watchAssignPermission(){
    yield takeEvery(ASSIGN_PERMISSION, assignPermissions);
}

export function* watchGetRoles() {
  yield takeEvery(GET_ROLE, getRoles);
}

export function* watchGetRolePermission() {
    yield takeEvery(GET_ROLE_PERMISSION_SELECT, getRolePermission);
}


function* roleSaga() {
    yield all([
        fork(watchGetPermission),
        fork(watchCreateRole),
        fork(watchGetRoles),
        fork(watchAssignPermission),
        fork(watchGetRolePermission),
    ]);
}


export default roleSaga;
