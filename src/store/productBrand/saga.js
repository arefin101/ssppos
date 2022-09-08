import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { GET_BRAND_LIST, CREATE_BRAND } from "./actionType";

import {
    brandApiResponseSuccess,
    brandApiResponseError,
} from "./action";

import {
    getBrandList as getBrandListApi,
    createBrand as createBrandApi,
} from "../../helpers/fakebackend_helper";

function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}

function* getBrandList({payload:{history}}) {
   
    try {

      const response = yield call(getBrandListApi);
      yield put(brandApiResponseSuccess(GET_BRAND_LIST, response));

    } catch (error) {
  
      if(error[1] === 401){
          redirectToLogin(history)
      }
      else{
          yield put(brandApiResponseError(GET_BRAND_LIST , error[0]));
      }

    }
}

function* createBrand({payload:{ formdata , history } }) {

    try {
        
        const response =  yield call(createBrandApi, formdata);
        localStorage.setItem("brand", JSON.stringify(response));

        yield put(brandApiResponseSuccess(CREATE_BRAND, response));
        history.push("/brand-list");
      
    }catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(brandApiResponseError(CREATE_BRAND, error[0]));
        }
    } 

}


export function* watchGetBrandList() {
    yield takeEvery(GET_BRAND_LIST, getBrandList);
}

export function* watchCreateBrand(){
    yield takeEvery(CREATE_BRAND, createBrand);
}

function* productBrandSaga() {

    yield all([
        fork(watchGetBrandList),
        fork(watchCreateBrand),
    ]);

}
export default productBrandSaga;