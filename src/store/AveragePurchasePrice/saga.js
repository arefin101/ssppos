import { call, put, takeEvery, all, fork } from "redux-saga/effects";


import {
    GET_AVERAGE_PURCHASE_PRICES,
} from "./actionType";


import {
    averagePurchasePriceApiResponseSuccess,
    averagePurchasePriceApiResponseError,
} from "./action";


import {
    getAveragePurchasePrices as getAveragePurchasePricesApi,
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

export function* watchGetAveragePurchasePrices() {
    yield takeEvery(GET_AVERAGE_PURCHASE_PRICES, getAveragePurchasePrices);
}

function* averagePurchasePriceSaga() {
    yield all([
        fork(watchGetAveragePurchasePrices),
    ]);
}
export default averagePurchasePriceSaga;

