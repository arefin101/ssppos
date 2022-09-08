import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
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
    DOWNLOAD_SALE_INVOICE,
    EMAIL_SALE_INVOICE,
    SALE_TRANSACTION_VERIFICATION,
    SALE_RETURN_TRANSACTION_VERIFICATION,
    SELLING_PRICE_APPROVAL
} from "./actionType";

  
export const saleApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const saleApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const imeiScan = (imei, history) => ({
    type: IMEI_SCAN,
    payload: { imei, history },
});

export const getSaleList = (history) => ({
    type: GET_SALE_LIST,
    payload: { history },
});

export const getStoreSaleView = (history) => ({
    type: GET_STORE_SALE_VIEW,
    payload: { history },
});

export const createSaleTransaction = (data, history) => ({
    type: CREATE_SALE_TRANSACTION,
    payload: {data, history}
});

export const getSaleVariations = (id, history) => ({
    type: GET_SALE_VARIATIONS,
    payload: { id, history },
});

export const getPurchaseVariationsSale = (modelId, productId, history) => ({
    type: GET_PURCHASE_VARIATIONS_SALE,
    payload: {modelId, productId, history}
});

export const alternativeScan = (id, history) => ({
    type: ALTERNATIVE_SCAN,
    payload: {id, history}
})

export const saleReturnList = (history) => ({
    type: SALE_RETURN_LIST,
    payload: {history}
})

export const saleReturnVariationById = (id, history) => ({
    type: SALE_RETURN_VARIATION_BY_ID,
    payload: {id, history}
})
export const getSaleReturnStoreView = (id, history) => ({
    type: GET_SALE_RETURN_STORE_VIEW,
    payload: { id, history }
});

export const createSaleReturn = (data, history) => ({
    type: CREATE_SALE_RETURN,
    payload: { data, history }
});

export const getSaleInvoice = (id, history) => ({
    type: GET_SALE_INVOICE,
    payload: { id, history },
});

export const getSaleReturnInvoice = (id, history) => ({
    type: GET_SALE_RETURN_INVOICE,
    payload: { id, history },
});

// export const downloadSaleInvoice = (id, history) => ({
//     type: DOWNLOAD_SALE_INVOICE,
//     payload: { id, history },
// });

export const emailSaleInvoice = (id, history) => ({
    type: EMAIL_SALE_INVOICE,
    payload: { id, history },
});

export const saleVerification = (data, history) => ({
    type: SALE_TRANSACTION_VERIFICATION,
    payload: { data, history }
});

export const saleReturnVerification = (data, history) => ({
    type: SALE_RETURN_TRANSACTION_VERIFICATION,
    payload: { data, history},
});

export const sellingPriceApproval = (data, history) => ({
    type: SELLING_PRICE_APPROVAL,
    payload: { data, history},
});