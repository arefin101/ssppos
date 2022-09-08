import { call, put, takeEvery, all, fork } from "redux-saga/effects";



import { 
    IMEI_SCAN, 
    GET_SALE_LIST,
    CREATE_SALE_TRANSACTION,
    GET_STORE_SALE_VIEW,
    GET_SALE_VARIATIONS,
    GET_PURCHASE_VARIATIONS_SALE,
    ALTERNATIVE_SCAN,
    SALE_RETURN_LIST,
    SALE_RETURN_VARIATION_BY_ID,
    GET_SALE_RETURN_STORE_VIEW,
    CREATE_SALE_RETURN,
    GET_SALE_INVOICE,
    GET_SALE_RETURN_INVOICE,
    // DOWNLOAD_SALE_INVOICE,
    EMAIL_SALE_INVOICE,
    SALE_TRANSACTION_VERIFICATION,
    SALE_RETURN_TRANSACTION_VERIFICATION,
    SELLING_PRICE_APPROVAL
} from "./actionType";



import {
    saleApiResponseSuccess,
    saleApiResponseError,
} from "./action";



import { 
    imeiScan as imeiScanApi,
    getSaleList as getSaleListApi,
    createSaleTransaction as createSaleTransactionApi,
    getStoreSaleView as getStoreSaleViewApi,
    getSaleVariations as getSaleVariationsApi,
    getPurchaseVariationsSale as getPurchaseVariationsSaleApi,
    alternativeScan as alternativeScanApi,
    saleReturnList as saleReturnListApi,
    saleReturnVariationById as saleReturnVariationByIdApi,
    getSaleReturnStoreView as getSaleReturnStoreViewApi,
    createSaleReturn as createSaleReturnApi,
    getSaleInvoice as getSaleInvoiceApi,
    getSaleReturnInvoice as getSaleReturnInvoiceApi,
    downloadSaleInvoice as downloadSaleInvoiceApi,
    emailSaleInvoice as emailSaleInvoiceApi,
    saleVerification as saleVerificationApi,
    saleReturnVerification as saleReturnVerificationApi,
    sellingPriceApproval as sellingPriceApprovalApi,
} from "../../helpers/fakebackend_helper";



function redirectToLogin(history){
    localStorage.clear()
    history.push("/logout")
}

function* imeiScan({ payload:{ imei, history } }) {
    try {
        const response =  yield call(imeiScanApi, imei);
        localStorage.setItem("imeiScanSuccess", true);
        yield put(saleApiResponseSuccess( IMEI_SCAN, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history);
        }
        else{
            localStorage.setItem("imeiScanError", true);
            yield put(saleApiResponseError( IMEI_SCAN, error[0]));
        }
    }
}

function* getSaleList({ payload: { history } }) {
    try {
        const response = yield call(getSaleListApi);
        yield put(saleApiResponseSuccess(GET_SALE_LIST, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(saleApiResponseError(GET_SALE_LIST, error[0]));
        }
    } 
}

function* getStoreSaleView({ payload: { history } }) {
    try {
        const response = yield call(getStoreSaleViewApi);
        yield put(saleApiResponseSuccess(GET_STORE_SALE_VIEW, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(saleApiResponseError(GET_STORE_SALE_VIEW, error[0]));
        }
    } 
}

function* createSaleTransaction({ payload: {data, history}}) {
    try {

        const response = yield call(createSaleTransactionApi, data);

        localStorage.setItem("createSaleTransactionSuccess", true);

        yield put(saleApiResponseSuccess(CREATE_SALE_TRANSACTION, response));
        
        history.push("/sale-list")
        
    } catch (error) {

        if(error[1] === 401) {
            
            redirectToLogin(history);

        } else {

            localStorage.setItem("createSaleTransactionError", true);

            yield put(saleApiResponseError(CREATE_SALE_TRANSACTION, error[0]));
        
        }
    }
}

function* getSaleVariations({ payload:{ id, history } }) {
    try {
        const response =  yield call(getSaleVariationsApi, id);
        localStorage.setItem("SaleVariations", true);
        yield put(saleApiResponseSuccess( GET_SALE_VARIATIONS, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history);
        }
        else if(error[1] === 404){
            yield put(saleApiResponseError(GET_SALE_VARIATIONS, {response:{}}))
        }
        else{
            yield put(saleApiResponseError( GET_SALE_VARIATIONS, error[0]));
        }
    }
}

function* getPurchaseVariationsSale({ payload: {modelId, productId, history} }) {
    try {

        const response = yield call(getPurchaseVariationsSaleApi, modelId, productId);

        yield put(saleApiResponseSuccess(GET_PURCHASE_VARIATIONS_SALE, response));

    } catch (error) {
        
        if(error[1] === 401) {
            
            redirectToLogin(history);

        } else {

            // 
        
        }

    }
}

function* alternativeScan({ payload: {id, history} }) {
    try {

        const response = yield call(alternativeScanApi, id);

        localStorage.setItem("alternativeScanSuccess", true);

        yield put(saleApiResponseSuccess(ALTERNATIVE_SCAN, response));

    } catch (error) {

        if(error[1] === 401) {
            
            redirectToLogin(history);

        } else {

            localStorage.setItem("alternativeScanSuccess", true);

            yield put(saleApiResponseError(ALTERNATIVE_SCAN, error[0]));
        
        }

    }

}

function* saleReturnList({ payload: { history } }) {

    try {

        const response = yield call(saleReturnListApi);
        yield put(saleApiResponseSuccess(SALE_RETURN_LIST, response));

    } catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(saleApiResponseError(SALE_RETURN_LIST, error[0]));
        }
    }

}

function* saleReturnVariationById({ payload: {id, history} }) {

    try {

        const response = yield call(saleReturnVariationByIdApi, id);
        localStorage.setItem('SaleReturnVariationById', true);
        yield put(saleApiResponseSuccess(SALE_RETURN_VARIATION_BY_ID, response));

    } catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(saleApiResponseError(SALE_RETURN_VARIATION_BY_ID, error[0]));
        }
    }

}

function* getSaleReturnStoreView({ payload: {id, history } }) {
    try {
        const response = yield call(getSaleReturnStoreViewApi, id);
        localStorage.setItem('SaleReturnStoreView', true);
        yield put(saleApiResponseSuccess(GET_SALE_RETURN_STORE_VIEW, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            yield put(saleApiResponseError(GET_SALE_RETURN_STORE_VIEW, error[0]));
        }
    } 
}

function* createSaleReturn({ payload: {data, history} }) {
    try {

        const response = yield call(createSaleReturnApi, data);
        localStorage.setItem("saleReturn", true);
        yield put(saleApiResponseSuccess(CREATE_SALE_RETURN, response));
        history.push("/sale-return-list")

    } catch (error) {

        if(error[1] === 401){
            redirectToLogin(history)
        }
        else{
            localStorage.setItem("saleReturnError", true);
            yield put(saleApiResponseError(CREATE_SALE_RETURN, error[0]));
        }

    }
}

function* getSaleInvoice({ payload:{ id, history } }) {
    try {
        const response =  yield call(getSaleInvoiceApi, id);
        localStorage.setItem("SaleInvoice", true);
        yield put(saleApiResponseSuccess( GET_SALE_INVOICE, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history);
        }
        else{
            yield put(saleApiResponseError( GET_SALE_INVOICE, error[0]));
        }
    }
}

function* getSaleReturnInvoice({ payload:{ id, history } }) {
    try {
        const response =  yield call(getSaleReturnInvoiceApi, id);
        localStorage.setItem("SaleReturnInvoice", true);
        yield put(saleApiResponseSuccess( GET_SALE_RETURN_INVOICE, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history);
        }
        else{
            yield put(saleApiResponseError( GET_SALE_RETURN_INVOICE, error[0]));
        }
    }
}

// function* downloadSaleInvoice({ payload:{ id, history } }) {
//     try {
//         const response =  yield call(downloadSaleInvoiceApi, id);
//         yield put(saleApiResponseSuccess( DOWNLOAD_SALE_INVOICE, response));
//     } 
//     catch (error) {
//         if(error[1] === 401){
//             redirectToLogin(history);
//         }
//         else{
//             yield put(saleApiResponseError( DOWNLOAD_SALE_INVOICE, error[0]));
//         }
//     }
// }

function* emailSaleInvoice({ payload:{ id, history } }) {
    try {
        const response =  yield call(emailSaleInvoiceApi, id);
        yield put(saleApiResponseSuccess( EMAIL_SALE_INVOICE, response));
    } 
    catch (error) {
        if(error[1] === 401){
            redirectToLogin(history);
        }
        else{
            yield put(saleApiResponseError( EMAIL_SALE_INVOICE, error[0]));
        }
    }
}

function* saleVerification({ payload: {data, history}}) {
    try {

        const response = yield call(saleVerificationApi, data);

        yield put(saleApiResponseSuccess(SALE_TRANSACTION_VERIFICATION, response));
        
    } catch (error) {

        if(error[1] === 401) {
            
            redirectToLogin(history);

        } else {

            yield put(saleApiResponseError(SALE_TRANSACTION_VERIFICATION, error[0]));
        
        }
    }
}

function* saleReturnVerification({ payload: {data, history}}) {
    try {

        const response = yield call(saleReturnVerificationApi, data);

        yield put(saleApiResponseSuccess(SALE_RETURN_TRANSACTION_VERIFICATION, response));
        
    } catch (error) {

        if(error[1] === 401) {
            
            redirectToLogin(history);

        } else {

            yield put(saleApiResponseError(SALE_RETURN_TRANSACTION_VERIFICATION, error[0]));
        
        }
    }
}

function* sellingPriceApproval({ payload: {data, history}}) {
    try {

        const response = yield call(sellingPriceApprovalApi, data);

        yield put(saleApiResponseSuccess(SELLING_PRICE_APPROVAL, response));
        
    } catch (error) {

        if(error[1] === 401) {
            
            redirectToLogin(history);

        } else {

            yield put(saleApiResponseError(SELLING_PRICE_APPROVAL, error[0]));
        
        }
    }
}
     


export function* watchImeiScan() {
    yield takeEvery(IMEI_SCAN, imeiScan);
}

export function* watchGetSaleList() {
    yield takeEvery(GET_SALE_LIST, getSaleList);
}

export function* watchCreateSaleTransaction() {
    yield takeEvery(CREATE_SALE_TRANSACTION, createSaleTransaction);
}

export function* watchGetStoreSaleView() {
    yield takeEvery(GET_STORE_SALE_VIEW, getStoreSaleView);
}

export function* watchGetPurchaseVariationsSale() {
    yield takeEvery(GET_PURCHASE_VARIATIONS_SALE, getPurchaseVariationsSale);    
}

export function* watchAlternativeScan() {
    yield takeEvery(ALTERNATIVE_SCAN, alternativeScan);
}

export function* watchGetSaleVariations(){
    yield takeEvery(GET_SALE_VARIATIONS, getSaleVariations);
}

export function* watchSaleReturnList() {
    yield takeEvery(SALE_RETURN_LIST, saleReturnList);
}

export function* watchSaleReturnVariationById() {
    yield takeEvery(SALE_RETURN_VARIATION_BY_ID, saleReturnVariationById);
}

export function* watchGetSaleReturnStoreView(){
    yield takeEvery(GET_SALE_RETURN_STORE_VIEW, getSaleReturnStoreView);
}

export function* watchCreateSaleReturn() {
    yield takeEvery(CREATE_SALE_RETURN, createSaleReturn);
}

export function* watchGetSaleInvoice() {
    yield takeEvery(GET_SALE_INVOICE, getSaleInvoice);
}

export function* watchGetSaleReturnInvoice() {
    yield takeEvery(GET_SALE_RETURN_INVOICE, getSaleReturnInvoice);
}

// export function* watchDownloadSaleInvoice() {
//     yield takeEvery(DOWNLOAD_SALE_INVOICE, downloadSaleInvoice);
// }

export function* watchEmailSaleInvoice() {
    yield takeEvery(EMAIL_SALE_INVOICE, emailSaleInvoice);
}

export function* watchSaleVerification() {
    yield takeEvery(SALE_TRANSACTION_VERIFICATION, saleVerification);
}

export function* watchSaleReturnVerification() {
    yield takeEvery(SALE_RETURN_TRANSACTION_VERIFICATION, saleReturnVerification);
}

export function* watchSellingPriceApproval() {
    yield takeEvery(SELLING_PRICE_APPROVAL, sellingPriceApproval);
}

function* saleSaga() {  
    
    yield all([
        
        fork(watchImeiScan),
        fork(watchGetSaleList),
        fork(watchCreateSaleTransaction),
        fork(watchGetStoreSaleView),
        fork(watchGetSaleVariations),
        fork(watchGetPurchaseVariationsSale),
        fork(watchAlternativeScan),        
        fork(watchGetSaleReturnStoreView),
        fork(watchSaleReturnList),         
        fork(watchSaleReturnVariationById),
        fork(watchCreateSaleReturn),
        fork(watchGetSaleInvoice),
        fork(watchGetSaleReturnInvoice),
        // fork(watchDownloadSaleInvoice),
        fork(watchEmailSaleInvoice),
        fork(watchSaleVerification),
        fork(watchSaleReturnVerification),
        fork(watchSellingPriceApproval),

    ]);

}



export default saleSaga;
