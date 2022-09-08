import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_PRODUCTS_ON_HAND,
    GET_PRODUCTS_ON_HAND_VARIATIONS,
    GET_PRODUCT_TRANSFER_VIEW,
    GET_PRODUCT_TRANSFER_HISTORY,
    GET_PRODUCT_TRANSFER_HISTORY_DETAILS,
    CREATE_PRODUCT_TRANSFER,
    GET_PURCHASE_INVOICE_LIST,
    GET_LAST_TRANSACTION,
    GET_PRODUCT_BY_PURCHASE_INVOICE,
    GET_PRODUCT_BY_LAST_TRANSACTION,
    GET_PRODUCT_BY_IMEI_SCAN,
} from "./actionType";


export const productLocationApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const productLocationApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getProductsOnHand = (history) => ({
    type: GET_PRODUCTS_ON_HAND,
    payload:{history}
});

export const getProductsOnHandVariations = (id, history) => ({
    type: GET_PRODUCTS_ON_HAND_VARIATIONS,
    payload:{id, history}
});

export const getProductTransferView = (history) => ({
    type: GET_PRODUCT_TRANSFER_VIEW,
    payload:{history}
});

export const getProductTransferHistory = (history) => ({
    type: GET_PRODUCT_TRANSFER_HISTORY,
    payload:{history}
});

export const getProductTransferHistoryDetails = (id, history) => ({
    type: GET_PRODUCT_TRANSFER_HISTORY_DETAILS,
    payload:{id, history}
});

export const productTransfer = (data, history) => ({
    type: CREATE_PRODUCT_TRANSFER,
    payload:{data, history}
});

export const getPurchaseInvoiceList = ( history) => ({
    type: GET_PURCHASE_INVOICE_LIST,
    payload:{history}
});
export const getLastTransactions = ( history) => ({
    type: GET_LAST_TRANSACTION,
    payload:{history}
});
export const getProductsByPurchaseInvoice = (id, history) => ({
    type: GET_PRODUCT_BY_PURCHASE_INVOICE,
    payload:{id, history}
});
export const getProductsByLastTransaction = (id, history) => ({
    type: GET_PRODUCT_BY_LAST_TRANSACTION,
    payload:{id, history}
});
export const getProductsByImeiScan = (imei, history) => ({
    type: GET_PRODUCT_BY_IMEI_SCAN,
    payload:{imei, history}
});