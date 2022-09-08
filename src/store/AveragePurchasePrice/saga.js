import { call, put, takeEvery, all, fork } from "redux-saga/effects";


import {
    GET_AVERAGE_PURCHASE_PRICES,
    GET_PURCHASE_PRODUCT_LIST,
} from "./actionType";


import {
    averagePurchasePriceApiResponseSuccess,
    averagePurchasePriceApiResponseError,
} from "./action";


import {
    getAveragePurchasePrices as getAveragePurchasePricesApi,
    getPurchaseProductList as getPurchaseProductListApi,
} from "../../helpers/fakebackend_helper";

function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}

function*  getAveragePurchasePrices({payload:{history}}) {

    try {
        const response =  yield call (getAveragePurchasePricesApi);
        yield put(averagePurchasePriceApiResponseSuccess(GET_AVERAGE_PURCHASE_PRICES, response));
    } 
    catch (error) { 
        if(error[1] === 401){
            redirectToLogin(history)
        }else{
            yield put(averagePurchasePriceApiResponseError(GET_AVERAGE_PURCHASE_PRICES, error[0]));
        }
    }

}

function*  getPurchaseProductList({payload:{sku, history}}) {

    try {
        const response =  yield call (getPurchaseProductListApi, sku);
        localStorage.setItem('purchaseProducts', true);
        yield put(averagePurchasePriceApiResponseSuccess(GET_PURCHASE_PRODUCT_LIST, response));
    } 
    catch (error) { 
        if(error[1] === 401){
            redirectToLogin(history)
        }else{
            yield put(averagePurchasePriceApiResponseError(GET_PURCHASE_PRODUCT_LIST, error[0]));
        }
    }

}



export function* watchGetAveragePurchasePrices() {
    yield takeEvery(GET_AVERAGE_PURCHASE_PRICES, getAveragePurchasePrices);
}
export function* watchGetPurchaseProductList() {
    yield takeEvery(GET_PURCHASE_PRODUCT_LIST, getPurchaseProductList);
}



function* averagePurchasePriceSaga() {
    yield all([
        fork(watchGetAveragePurchasePrices),
        fork(watchGetPurchaseProductList),
    ]);
}
export default averagePurchasePriceSaga;

