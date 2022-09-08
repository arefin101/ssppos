import { call, put, takeEvery, all, fork } from "redux-saga/effects";


import { 
    GET_PRODUCT_LIST,
    CREATE_PRODUCT_PHONE,
    CREATE_PRODUCT_CHARGER,
    GET_PRODUCT_BRAND_SELECT, 
    GET_PRODUCT_CATEGORY,
    GET_VARIATIONS_BY_PRODUCT,
} from "./actionType";


import {
    productApiResponseSuccess,
    productApiResponseError,
} from "./action";


import {
  createPhone as createPhoneApi,
  createCharger as createChargerApi,
  getProductList as getProductListApi,
  getProductBrandSelect as getProductBrandSelectApi,
  getProductCategory as getProductCategoryApi,
  getVariationsByProduct as getVariationsByProductApi,
} from "../../helpers/fakebackend_helper";

function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}


function* getProductList({payload:{history}}) {

    try {
        const response = yield call(getProductListApi);
        yield put(productApiResponseSuccess(GET_PRODUCT_LIST, response));
    }catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(productApiResponseError(GET_PRODUCT_LIST , error[0]));
        }
    }  
}

function* getProductBrandSelect() {

    try {
        const response = yield call(getProductBrandSelectApi);
        yield put(productApiResponseSuccess(GET_PRODUCT_BRAND_SELECT, response));
    } catch (error) {
        yield put(productApiResponseError(GET_PRODUCT_BRAND_SELECT, error));
    }
}


function* createPhone({payload:{ fromdata , history } }) {

    try {

        const response =  yield call(createPhoneApi, fromdata);

        localStorage.setItem("phoneProduct", JSON.stringify(response));

        yield put(productApiResponseSuccess(CREATE_PRODUCT_PHONE, response));

        history.push("/product-list");

    } catch (error) {

        if(error[1] === 401){

            redirectToLogin(history)

        }
        else{

            yield put(productApiResponseError(CREATE_PRODUCT_PHONE, error[0]));

        }

    }  

}


function* createCharger({payload:{ fromdata , history } }) {

    try {

        const response =  yield call(createChargerApi, fromdata);
        
        localStorage.setItem("chargerProduct", JSON.stringify(response));
        yield put(productApiResponseSuccess(CREATE_PRODUCT_CHARGER, response));
      
        history.push("/product-list");

    }catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(productApiResponseError(CREATE_PRODUCT_CHARGER, error[0]));
        }
    }  
}


function* getProductCategory({payload:{ id, history } }) {

    try {

        const response =  yield call(getProductCategoryApi,id);

        yield put(productApiResponseSuccess(GET_PRODUCT_CATEGORY, response));

    } catch (error) {

        if(error[1] === 401){

            redirectToLogin(history)

        } else{

            yield put(productApiResponseError(GET_PRODUCT_CATEGORY , error[0]));

        }

    }  

}

function* getVariationsByProduct( { payload: { id } } ){

    try{

        const response = yield call(getVariationsByProductApi, id);

        localStorage.setItem('variationsByProduct', "success");

        yield put(productApiResponseSuccess(GET_VARIATIONS_BY_PRODUCT, response));

    }catch (error) {

        //

    }

}


export function* watchGetProductList() {
    yield takeEvery(GET_PRODUCT_LIST, getProductList);
}


export function* watchCreatePhone(){
    yield takeEvery(CREATE_PRODUCT_PHONE, createPhone);
} 


export function* watchCreateCharger(){
    yield takeEvery(CREATE_PRODUCT_CHARGER, createCharger);
} 


export function* watchProductBrandSelect() {
    yield takeEvery(GET_PRODUCT_BRAND_SELECT, getProductBrandSelect);
}

export function* watchGetProductCategory(){
    yield takeEvery(GET_PRODUCT_CATEGORY, getProductCategory);
}

export function* watchGetVariationsByProduct(){
    yield takeEvery(GET_VARIATIONS_BY_PRODUCT, getVariationsByProduct);
}


function* productSaga() {
    yield all([
        fork(watchGetProductList),
        fork(watchCreatePhone),
        fork(watchCreateCharger),
        fork(watchProductBrandSelect),
        fork(watchGetProductCategory),
        fork(watchGetVariationsByProduct),
    ]);
}


export default productSaga;
