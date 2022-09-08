import {
    GET_SKU_TRANSFER_VIEW_DATA,
    GET_SKU_TRANSFER_STORE_DATA,
    SKU_TRANSFER,
    SKU_TRANSFER_HISTORY,
    SKU_TRANSFER_HISTORY_DETAILS,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
} from "./actionType";


export const SkuTransferApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const SkuTransferApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getSkuTransferViewData = (history) => ({
    type: GET_SKU_TRANSFER_VIEW_DATA,
    payload: { history },
});

export const getSkuTransferViewStore = (history, id) => ({
    type: GET_SKU_TRANSFER_STORE_DATA,
    payload: { history, id },
});

export const skuTransfer = (history, data) => ({
    type: SKU_TRANSFER,
    payload: { history, data },
});

export const getSkuTransferHistory = (history) => ({
    type: SKU_TRANSFER_HISTORY,
    payload: { history },
});

export const getHistoryDetails = (batch_no, history) => ({
    type: SKU_TRANSFER_HISTORY_DETAILS,
    payload: { batch_no, history },
});
