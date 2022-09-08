import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { 
    GET_PAYMENT_METHODS,
    CREATE_PAYMENT_METHOD,
    GET_ADD_CUSTOMER_CREDIT_VIEW,
    CREATE_CUSTOMER_CREDIT,
    GET_INVOICE_LIST,
    MAKE_PAYMENT_VIEW,
    CREATE_SALE_PAYMENT,
    GET_CUSTOMER_DROPDOWN,
    GET_COLLECTIVE_PAYMENT_VIEW,
    CREATE_COLLECTIVE_PAYMENT,
    GET_PURCHASE_PAYMENT_VIEW,
    CREATE_PURCHASE_PAYMENT,
    GET_EXPENSE_PAYMENT_VIEW,
    CREATE_EXPENSE_PAYMENT,
    GET_PAYMENTS_BY_METHOD,
    GET_PAYMENT_METHOD_REPORT,
    PAYMENT_VERIFICATION,
    WITHDRAW_CUSTOMER_CREDIT,
    GET_AVAILABLE_CUSTOMER_CREDIT,
    GET_PAYMENT_METHOD_SUMMARY,
} from "./actionType";

import {
    paymentApiResponseSuccess,
    paymentApiResponseError,
} from "./action";


import {
    getPaymentMethods as getPaymentMethodsApi,
    createPaymentMethod as createPaymentMethodApi,
    getAddCustomerCreditView as getAddCustomerCreditViewApi,
    createCustomerCredit as createCustomerCreditApi,
    getInvoiceList as getInvoiceListApi,
    makePaymentView as makePaymentViewApi,
    createSalePayment as createSalePaymentApi,
    getCustomerDropdown as getCustomerDropdownApi,
    getCollectivePaymentView as getCollectivePaymentViewApi,
    createCollectivePayment as createCollectivePaymentApi,
    getPurchasePaymentView as getPurchasePaymentViewApi,
    createPurchasePayment as createPurchasePaymentApi,
    getExpensePaymentView as getExpensePaymentViewApi,
    createExpensePayment as createExpensePaymentApi,
    getPaymentMethodReport as getPaymentMethodReportApi,
    getPaymentMethodSummary as getPaymentMethodSummaryApi,
    getPaymentsByMethod as getPaymentsByMethodApi,
    paymentVerification as paymentVerificationApi,
    withdrawCustomerCredit as withdrawCustomerCreditApi,
    getAvailableCustomerCredit as getAvailableCustomerCreditApi,
} from "../../helpers/fakebackend_helper";

function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}


function* getPaymentMethods({payload:{history}}) {

    try {
        const response = yield call(getPaymentMethodsApi);
        yield put(paymentApiResponseSuccess(GET_PAYMENT_METHODS, response));
    } 
    catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(paymentApiResponseError(GET_PAYMENT_METHODS , error[0]));
        }
    } 
}


function* createPaymentMethod({payload:{ data , history } }) {

    try {

        const response =  yield call(createPaymentMethodApi, {name: data.name.toUpperCase()});
        localStorage.setItem("paymentMethod", true);
        yield put(paymentApiResponseSuccess(CREATE_PAYMENT_METHOD, response));
        history.push("/payment-methods");
        
    } catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(paymentApiResponseError(CREATE_PAYMENT_METHOD, error[0]));
        }
    } 
}


function* getAddCustomerCreditView({ payload: {id, history} }){
    try{
        const response = yield call(getAddCustomerCreditViewApi);
        yield put( paymentApiResponseSuccess(GET_ADD_CUSTOMER_CREDIT_VIEW, response) );
    }
    catch(error){
        if(error[1] === 401){
            redirectToLogin(history);
        }
        else{
            yield put(paymentApiResponseError(GET_ADD_CUSTOMER_CREDIT_VIEW , error[0]));
        }
    }
}


function* createCustomerCredit({payload:{ id, data, history } }) {
    try {

        const response =  yield call(createCustomerCreditApi, id, data);
        localStorage.setItem("addCustomerCredit", true);
        yield put( paymentApiResponseSuccess(CREATE_CUSTOMER_CREDIT, response) );
        // history.push("/money-transactions");
        } catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(paymentApiResponseError(CREATE_CUSTOMER_CREDIT, error[0]));
        }
    } 
}


function* getInvoiceList ({ payload: { history } }) {

    try {

        const response =  yield call(getInvoiceListApi);

        yield put(paymentApiResponseSuccess(GET_INVOICE_LIST, response));

    } catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(paymentApiResponseError(GET_INVOICE_LIST, error[0]));
        }

    }

}


function* makePaymentView ({ payload: { history } }) {

    try {

        const response =  yield call(makePaymentViewApi);

        yield put(paymentApiResponseSuccess(MAKE_PAYMENT_VIEW, response));

    } catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(paymentApiResponseError(MAKE_PAYMENT_VIEW, error[0]));
        }

    }

}


function* createSalePayment ({ payload: { data, history } }) {

    try {

        const response =  yield call(createSalePaymentApi, data);

        localStorage.setItem("createSalePayment", true);

        yield put(paymentApiResponseSuccess(CREATE_SALE_PAYMENT, response));

        history.push("/sale-payment-list");

    } catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(paymentApiResponseError(CREATE_SALE_PAYMENT, error[0]));
        }

    }

}


function* getCustomerDropdown({ payload: {history} }) {
    try {
        const response = yield call(getCustomerDropdownApi);
        yield put(paymentApiResponseSuccess(GET_CUSTOMER_DROPDOWN, response));
    } 
    catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(paymentApiResponseError(GET_CUSTOMER_DROPDOWN , error[0]));
        }
    } 
}


function* getCollectivePaymentView({ payload: {customerId, history} }){
    try{
        const response = yield call(getCollectivePaymentViewApi, customerId);
        yield put( paymentApiResponseSuccess(GET_COLLECTIVE_PAYMENT_VIEW, response) );
    }
    catch(error){
        if(error[1] === 401){
            redirectToLogin(history);
        }
        else{
            yield put(paymentApiResponseError(GET_COLLECTIVE_PAYMENT_VIEW , error[0]));
        }
    }
}


function* createCollectivePayment ({ payload: { data, history } }) {

    try {
        const response =  yield call(createCollectivePaymentApi, data);
        localStorage.setItem("createCollectivePayment", true);
        yield put(paymentApiResponseSuccess(CREATE_COLLECTIVE_PAYMENT, response));
        history.push("/collective-payment-list");
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(paymentApiResponseError(CREATE_COLLECTIVE_PAYMENT, error[0]));
        }
    }

}


function* getPurchasePaymentView ({ payload: { history } }) {
    try {
        const response =  yield call(getPurchasePaymentViewApi);
        yield put(paymentApiResponseSuccess(GET_PURCHASE_PAYMENT_VIEW, response));
    }
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(paymentApiResponseError(GET_PURCHASE_PAYMENT_VIEW, error[0]));
        }
    }
}


function* createPurchasePayment ({ payload: { data, history } }) {

    try {
        const response =  yield call(createPurchasePaymentApi, data);
        localStorage.setItem("createPurchasePayment", true);
        yield put(paymentApiResponseSuccess(CREATE_PURCHASE_PAYMENT, response));
        history.push("/purchase-payment-list");
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(paymentApiResponseError(CREATE_PURCHASE_PAYMENT, error[0]));
        }
    }

}


function* getExpensePaymentView ({ payload: { history } }) {
    try {
        const response = yield call(getExpensePaymentViewApi);
        yield put(paymentApiResponseSuccess(GET_EXPENSE_PAYMENT_VIEW, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(paymentApiResponseError(GET_EXPENSE_PAYMENT_VIEW, error[0]));
        }
    }
}


function* createExpensePayment ({ payload: { data, history } }) {

    try {
        const response =  yield call(createExpensePaymentApi, data);
        localStorage.setItem("createExpensePayment", true);
        yield put(paymentApiResponseSuccess(CREATE_EXPENSE_PAYMENT, response));
        history.push("/expense-payment-list");
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(paymentApiResponseError(CREATE_EXPENSE_PAYMENT, error[0]));
        }
    }

}


function* getPaymentMethodReport ({ payload: { history } }) {
    try {
        const response = yield call(getPaymentMethodReportApi);
        yield put(paymentApiResponseSuccess(GET_PAYMENT_METHOD_REPORT, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(paymentApiResponseError(GET_PAYMENT_METHOD_REPORT, error[0]));
        }
    }
}


function* getPaymentMethodSummary({payload:{history}}) {

    try {
        const response = yield call(getPaymentMethodSummaryApi);
        yield put(paymentApiResponseSuccess(GET_PAYMENT_METHOD_SUMMARY, response));
    } 
    catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(paymentApiResponseError(GET_PAYMENT_METHOD_SUMMARY , error[0]));
        }
    }
}


function* getPaymentsByMethod ({ payload: { id, history } }) {

    try {
        const response =  yield call(getPaymentsByMethodApi, id);
        yield put(paymentApiResponseSuccess(GET_PAYMENTS_BY_METHOD, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(paymentApiResponseError(GET_PAYMENTS_BY_METHOD, error[0]));
        }
    }

}


function* paymentVerification ({ payload: { data, history } }) {

    try {
        const response =  yield call(paymentVerificationApi, data);
        yield put(paymentApiResponseSuccess(PAYMENT_VERIFICATION, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(paymentApiResponseError(PAYMENT_VERIFICATION, error[0]));
        }
    }

}


function* withdrawCustomerCredit({payload:{ id, data, history } }) {
    try {

        const response =  yield call(withdrawCustomerCreditApi, id, data);
        localStorage.setItem("withdrawCustomerCredit", true);
        yield put( paymentApiResponseSuccess(WITHDRAW_CUSTOMER_CREDIT, response) );
        // history.push("/money-transactions");
        } catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(paymentApiResponseError(WITHDRAW_CUSTOMER_CREDIT, error[0]));
        }
    } 
}


function* getAvailableCustomerCredit ({ payload: { id, history } }) {

    try {
        const response =  yield call(getAvailableCustomerCreditApi, id);
        yield put(paymentApiResponseSuccess(GET_AVAILABLE_CUSTOMER_CREDIT, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(paymentApiResponseError(GET_AVAILABLE_CUSTOMER_CREDIT, error[0]));
        }
    }

}





export function* watchGetPaymentMethods() {
    yield takeEvery(GET_PAYMENT_METHODS, getPaymentMethods);
}
export function* watchCreatePaymentMethod(){
    yield takeEvery(CREATE_PAYMENT_METHOD, createPaymentMethod);
}
export function* watchGetAddCustomerCreditView() {
    yield takeEvery(GET_ADD_CUSTOMER_CREDIT_VIEW, getAddCustomerCreditView);
}
export function* watchCreateCustomerCredit(){
    yield takeEvery(CREATE_CUSTOMER_CREDIT, createCustomerCredit);
}
export function* watchWithdrawCustomerCredit(){
    yield takeEvery(WITHDRAW_CUSTOMER_CREDIT, withdrawCustomerCredit);
}
export function* watchGetInvoiceList() {
    yield takeEvery(GET_INVOICE_LIST, getInvoiceList);
}
export function* watchMakePaymentView() {
    yield takeEvery(MAKE_PAYMENT_VIEW, makePaymentView);
}
export function* watchCreateSalePayment() {
    yield takeEvery(CREATE_SALE_PAYMENT, createSalePayment);
}
export function* watchGetCustomerDropdown() {
    yield takeEvery(GET_CUSTOMER_DROPDOWN, getCustomerDropdown);
}
export function* watchGetCollectivePaymentView() {
    yield takeEvery(GET_COLLECTIVE_PAYMENT_VIEW, getCollectivePaymentView);
}
export function* watchCreateCollectivePayment() {
    yield takeEvery(CREATE_COLLECTIVE_PAYMENT, createCollectivePayment);
}
export function* watchGetPurchasePaymentView() {
    yield takeEvery(GET_PURCHASE_PAYMENT_VIEW, getPurchasePaymentView);
}
export function* watchCreatePurchasePayment() {
    yield takeEvery(CREATE_PURCHASE_PAYMENT, createPurchasePayment);
}
export function* watchGetExpensePaymentView() {
    yield takeEvery(GET_EXPENSE_PAYMENT_VIEW, getExpensePaymentView);
}
export function* watchCreateExpensePayment() {
    yield takeEvery(CREATE_EXPENSE_PAYMENT, createExpensePayment);
}
export function* watchGetPaymentMethodReport() {
    yield takeEvery(GET_PAYMENT_METHOD_REPORT, getPaymentMethodReport);
}
export function* watchGetPaymentMethodSummary() {
    yield takeEvery(GET_PAYMENT_METHOD_SUMMARY, getPaymentMethodSummary);
}
export function* watchGetPaymentsByMethod() {
    yield takeEvery(GET_PAYMENTS_BY_METHOD, getPaymentsByMethod);
}
export function* watchPaymentVerification() {
    yield takeEvery(PAYMENT_VERIFICATION, paymentVerification);
}
export function* watchGetAvailableCustomerCredit() {
    yield takeEvery(GET_AVAILABLE_CUSTOMER_CREDIT, getAvailableCustomerCredit);
}



function* paymentSaga() {

    yield all([
        fork(watchGetPaymentMethods),
        fork(watchCreatePaymentMethod),        
        fork(watchGetAddCustomerCreditView),
        fork(watchCreateCustomerCredit),
        fork(watchGetInvoiceList),
        fork(watchMakePaymentView),
        fork(watchCreateSalePayment),        
        fork(watchGetCustomerDropdown),        
        fork(watchGetCollectivePaymentView),        
        fork(watchCreateCollectivePayment),        
        fork(watchCreatePurchasePayment),        
        fork(watchGetPurchasePaymentView),        
        fork(watchGetExpensePaymentView),        
        fork(watchCreateExpensePayment),    
        fork(watchGetPaymentMethodReport),    
        fork(watchGetPaymentMethodSummary),    
        fork(watchGetPaymentsByMethod),    
        fork(watchPaymentVerification),   
        fork(watchWithdrawCustomerCredit),
        fork(watchGetAvailableCustomerCredit),
    ]);

}



export default paymentSaga;