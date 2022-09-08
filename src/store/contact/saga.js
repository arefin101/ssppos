import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { GET_SUPPLIERS,
    GET_CUSTOMER_LIST, 
    CREATE_CUSTOMER, 
    CREATE_SUPPLIER, 
    GET_CUSTOMER_BY_ID, 
    UPDATE_CUSTOMER_BY_ID,
    GET_SUPPLIER_BY_ID,
    GET_SHIPPING_ADDRESS,
    ADD_SHIPPING_ADDRESS,
    DELETE_SHIPPING_ADDRESS,
    EDIT_SHIPPING_ADDRESS,
    UPDATE_SUPPLIER_BY_ID,
    GET_CUSTOMER_CREDIT,
    GET_SUPPLIER_CREDIT,
} from "./actionType";

import {
    contactApiResponseSuccess,
    contactApiResponseError,
} from "./action";

import {
    getSuppliers as getSuppliersApi,
    getSupplierById as getSupplierByIdApi,
    updateSupplierById as updateSupplierByIdApi,
    getCustomerList as getCustomerListApi,
    createSupplier as createSupplierApi,
    createCustomr as createCustomerApi ,
    getCustomerById as getCustomerByIdApi,
    getShippingAddress as getShippingAddressApi,
    addShippingAddress as addShippingAddressApi,
    deleteShippingAddress as deleteShippingAddressApi,
    editShippingAddress as editShippingAddressApi,
    updateCustomerById as updateCustomerByIdApi,
    getCustomerCredit as getCustomerCreditApi,
    getSupplierCredit as getSupplierCreditApi,
} from "../../helpers/fakebackend_helper";



function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}

function*  getSuppliers({payload:{history}}) {
    try {
        const response =  yield call (getSuppliersApi);
        yield put(contactApiResponseSuccess(GET_SUPPLIERS, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(contactApiResponseError(GET_SUPPLIERS , error[0]));
        }
    }
}

function* createSupplier({ payload:{ supplier ,history} }) {
    try {
        const response =  yield call(createSupplierApi, supplier);
        localStorage.setItem("supplier", JSON.stringify(response));
        yield put(contactApiResponseSuccess(CREATE_SUPPLIER, response));
        history.push("/supplier-List");
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(contactApiResponseError(CREATE_SUPPLIER, error[0]));
        }
    }
}

function* getSupplierById({payload:{id, history}}){
    try{
        const response = yield call(getSupplierByIdApi, id);
        yield put(contactApiResponseSuccess(GET_SUPPLIER_BY_ID, response));
    }
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else if(error[1] === 404){
            yield put(contactApiResponseError(GET_SUPPLIER_BY_ID, {supplier:{}}));
        }
        else{
            //
        }
    }
}

function* updateSupplierById({ payload: { id, data, history } }) {
    try {
        const response = yield call(updateSupplierByIdApi, id, data);
        yield put(contactApiResponseSuccess(UPDATE_SUPPLIER_BY_ID, response));
        localStorage.setItem('supplier-info-update', response);
        history.push('/supplier-details/'+id);
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(contactApiResponseError(UPDATE_SUPPLIER_BY_ID, error[0]));
        }
    }
}

function* getCustomerList({payload:{history}}) {
    try {
        const response = yield call(getCustomerListApi);
        yield put(contactApiResponseSuccess(GET_CUSTOMER_LIST, response));
    }
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(contactApiResponseError(GET_CUSTOMER_LIST, error[0]));
        }
    }
}

function* getCustomerById({ payload:{id, history} }) {
    try{
        const response = yield call(getCustomerByIdApi,id);
        yield put(contactApiResponseSuccess(GET_CUSTOMER_BY_ID, response));
    }
    catch (error){
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else if(error[1] === 404){
            yield put(contactApiResponseError(GET_CUSTOMER_BY_ID, {customer:{}}))
        }
        else{
            //
        }
    }
}

function* updateCustomerById({ payload: { id, data, history } }) {
    try {
        const response = yield call(updateCustomerByIdApi, id, data);
        yield put(contactApiResponseSuccess(UPDATE_CUSTOMER_BY_ID, response));
        localStorage.setItem('customer-info-update', response);
        history.push('/customer-details/'+id);
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(contactApiResponseError(UPDATE_CUSTOMER_BY_ID, error[0]));
        }
    }
}

function* createCustomer({ payload:{ customer ,history} }) {
    try {
        const response =  yield call(createCustomerApi, customer);
        localStorage.setItem("customer", JSON.stringify(response));
        yield put(contactApiResponseSuccess(CREATE_CUSTOMER, response));
        history.push("/customer-list");
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(contactApiResponseError(CREATE_CUSTOMER, error[0]));
        }
    }
}

function* getCustomerCredit({ payload:{id, history} }) {
    try{
        const response = yield call(getCustomerCreditApi, id);
        localStorage.setItem("response", true);
        yield put(contactApiResponseSuccess(GET_CUSTOMER_CREDIT, response));
    }
    catch (error){
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else if(error[1] === 404){
            yield put(contactApiResponseError(GET_CUSTOMER_CREDIT, {customer:{}}))
        }
        else{
            yield put(contactApiResponseError(GET_CUSTOMER_CREDIT, error[0]))
        }
    }
}

function* getShippingAddress({payload:{id, history}}) {
    try{
        const response = yield call(getShippingAddressApi,id);
        yield put(contactApiResponseSuccess(GET_SHIPPING_ADDRESS, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else if(error[1] === 404){
            yield put(contactApiResponseError(GET_SHIPPING_ADDRESS, {address:{}}))
        }
        else{
            yield put(contactApiResponseError(GET_SHIPPING_ADDRESS, error[0]))
        }
    }
}

function* addShippingAddress({ payload: { id, shippingAddress, history } }) {
    try {
        const response = yield call(addShippingAddressApi, id, shippingAddress);
        localStorage.setItem('add-shipping-address', id);
        yield put(contactApiResponseSuccess(ADD_SHIPPING_ADDRESS, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history);
        }
        else{
            yield put(contactApiResponseError(ADD_SHIPPING_ADDRESS, error[0]));
        }
    }
}

function* editShippingAddress({ payload: { id, shippingAddress, history } }) {
    try {
        const response = yield call(editShippingAddressApi, id, shippingAddress);
        localStorage.setItem('edit-shipping-address', id);
        yield put(contactApiResponseSuccess(EDIT_SHIPPING_ADDRESS, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history);
        }
        else{
            //
        }
    }
}

function* deleteShippingAddress({payload:{id, index, history}}) {
    try{
        const response = yield call(deleteShippingAddressApi,id, index);
        localStorage.setItem('delete-shipping-address', id);
        yield put(contactApiResponseSuccess(DELETE_SHIPPING_ADDRESS, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history);
        }
        else{
            yield put(contactApiResponseError(DELETE_SHIPPING_ADDRESS, error[0]));
        }
    }
}

function* getSupplierCredit({ payload:{id, history} }) {
    try{
        const response = yield call(getSupplierCreditApi, id);
        localStorage.setItem("scredit", true);
        yield put(contactApiResponseSuccess(GET_SUPPLIER_CREDIT, response));
    }
    catch (error){
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(contactApiResponseError(GET_SUPPLIER_CREDIT, error[0]))
        }
    }
}
    
  

export function* watchCreateSupplier(){
    yield takeEvery(CREATE_SUPPLIER, createSupplier);
}
export function* watchCreateCustomer(){
    yield takeEvery(CREATE_CUSTOMER, createCustomer);
}
export function* watchGetSuppliers() {
  yield takeEvery(GET_SUPPLIERS, getSuppliers);
}

export function* watchGetSupplierById() {
    yield takeEvery(GET_SUPPLIER_BY_ID, getSupplierById);
}

export function* watchGetCustomerList() {
  yield takeEvery(GET_CUSTOMER_LIST, getCustomerList);
}

export function* watchGetCustomerById() {
    yield takeEvery(GET_CUSTOMER_BY_ID, getCustomerById);
}

export function* watchGetShippingAddress() {
    yield takeEvery(GET_SHIPPING_ADDRESS, getShippingAddress);
}

export function* watchAddShippingAddress() {
    yield takeEvery(ADD_SHIPPING_ADDRESS, addShippingAddress);
}

export function* watchDeleteShippingAddress() {
    yield takeEvery(DELETE_SHIPPING_ADDRESS, deleteShippingAddress);
}

export function* watchEditShippingAddress() {
    yield takeEvery(EDIT_SHIPPING_ADDRESS, editShippingAddress);
}

export function* watchUpdateCustomerById() {
    yield takeEvery(UPDATE_CUSTOMER_BY_ID, updateCustomerById);
}

export function* watchUpdateSupplierById() {
    yield takeEvery(UPDATE_SUPPLIER_BY_ID, updateSupplierById);
}

export function* watchGetCustomerCredit() {
    yield takeEvery(GET_CUSTOMER_CREDIT, getCustomerCredit);
}

export function* watchGetSupplierCredit() {
    yield takeEvery(GET_SUPPLIER_CREDIT, getSupplierCredit);
}




function* contactSaga() {
    yield all([
        fork(watchCreateSupplier),
        fork(watchCreateCustomer),
        fork(watchGetSuppliers),
        fork(watchGetCustomerList),
        fork(watchGetCustomerById),
        fork(watchGetSupplierById),
        fork(watchGetShippingAddress),
        fork(watchAddShippingAddress),
        fork(watchDeleteShippingAddress),
        fork(watchEditShippingAddress),
        fork(watchUpdateCustomerById),
        fork(watchUpdateSupplierById),
        fork(watchGetCustomerCredit),
        fork(watchGetSupplierCredit),
    ]);
}

export default contactSaga;
