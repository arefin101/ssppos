import { call, put, takeEvery, all, fork } from "redux-saga/effects";


import { 
    GET_USERS, 
    GET_USER_BY_ID, 
    ADD_USER, 
    ADD_ROLE, 
    GET_ROLE_BY_ID, 
    UPDATE_USER_BY_ID,
    GET_CUA_LIST,
    CUA_ASSIGN,
    GET_CUA_ASSIGN_VIEW,
} from "./actionType";


import {
    userApiResponseSuccess,
    userApiResponseError,
} from "./action";


import {
    getUsers as getUsersApi,
    addUser as addUserApi,
    addUserRole as addUserRoleApi,
    getRoleById as getRoleByIdApi,
    getUserById as getUserByIdApi,
    updateUserById as updateUserByIdApi,
    getCuaList as getCuaListApi,
    cuaAssign as cuaAssignApi,
    getCuaAssignView as getCuaAssignViewApi,
} from "../../helpers/fakebackend_helper";



function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}


function* getUsers({ payload: { history } }) {
    try {

        const response = yield call(getUsersApi);
        yield put(userApiResponseSuccess(GET_USERS, response));

    } catch (error) {
    
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(userApiResponseError(GET_USERS, error[0]));
        }
    } 
}

function* addUser({ payload: { user, history } }) {
    try {
        const response = yield call(addUserApi, user);
        yield put(userApiResponseSuccess(ADD_USER, response));
        localStorage.setItem('user', response);
        history.push('/user-list');
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(userApiResponseError(ADD_USER, error[0]));
        }
    }
}

function* updateUserById({ payload: { id, data, history } }) {
    try {
        const response = yield call(updateUserByIdApi, id, data);
        yield put(userApiResponseSuccess(UPDATE_USER_BY_ID, response));
        localStorage.setItem('user-info-update', response);
        history.push('/user-details/'+id);
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(userApiResponseError(UPDATE_USER_BY_ID, error[0]));
        }
    }
}

function* getRoleById({payload:{id, history}}){
    try{
        const response = yield call(getRoleByIdApi,id);
        yield put(userApiResponseSuccess(GET_ROLE_BY_ID, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            console.log(error[0]);
        }
    }
}

function* getUserById({payload:{id, history}}){
    try{
        const response = yield call(getUserByIdApi,id);
        yield put(userApiResponseSuccess(GET_USER_BY_ID, response));
    }
    catch (error) {
        
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else if(error[1] === 404){
            yield put(userApiResponseError(GET_USER_BY_ID, {user:{}}))
        }
        else{
            console.log(error[0]);
        }
    }
}

function* addRole( { payload: { data, history } } ) {
    try {
        const response = yield call(addUserRoleApi, data);
        yield put(userApiResponseSuccess(ADD_ROLE, response));

        localStorage.setItem('roleResponse', response.message)
        history.push("/user-list");
    }
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            //
        }
    }
}

function* getCuaList({ payload: { history } }) {
    try {
        const response = yield call(getCuaListApi);
        yield put(userApiResponseSuccess(GET_CUA_LIST, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(userApiResponseError(GET_CUA_LIST, error[0]));
        }
    } 
}

function* cuaAssign({ payload: { data, history } }) {
    try {
        const response = yield call(cuaAssignApi, data);
        yield put(userApiResponseSuccess(CUA_ASSIGN, response));
        localStorage.setItem('cua', 'cua');
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(userApiResponseError(CUA_ASSIGN, error[0]));
        }
    }
}

function* getCuaAssignView({ payload: { history } }) {
    try {
        const response = yield call(getCuaAssignViewApi);
        yield put(userApiResponseSuccess(GET_CUA_ASSIGN_VIEW, response));
    } 
    catch (error) {
    
        if(error[1] === 401){
            redirectToLogin(history);
        }
        else{
            yield put(userApiResponseError(GET_CUA_ASSIGN_VIEW, error[0]));
        }
    } 
}


export function* watchGetUsers() {
    yield takeEvery(GET_USERS, getUsers);
}

export function* watchAddUser() {
    yield takeEvery(ADD_USER, addUser);
}

export function* watchAddRole() {
    yield takeEvery(ADD_ROLE, addRole);
}

export function* watchGetRoleById() {
    yield takeEvery(GET_ROLE_BY_ID ,getRoleById);
}

export function* watchGetUserById() {
    yield takeEvery(GET_USER_BY_ID ,getUserById);
}

export function* watchUpdateUserById() {
    yield takeEvery(UPDATE_USER_BY_ID, updateUserById);
}

export function* watchGetCuaList() {
    yield takeEvery(GET_CUA_LIST, getCuaList);
}

export function* watchCuaAssign() {
    yield takeEvery(CUA_ASSIGN, cuaAssign);
}

export function* watchGetCuaAssignView() {
    yield takeEvery(GET_CUA_ASSIGN_VIEW, getCuaAssignView);
}



function* userSaga() {
    yield all([
        fork(watchGetUsers),
        fork(watchAddUser), 
        fork(watchAddRole),
        fork(watchGetRoleById),
        fork(watchGetUserById),
        fork(watchUpdateUserById), 
        fork(watchGetCuaList),
        fork(watchCuaAssign),
        fork(watchGetCuaAssignView),
    ]);
}


export default userSaga;
