import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_PURCHASE_VARIATION,
    CREATE_PURCHASE_VARIATIONS,
    GET_PURCHASE_VARIATIONS_BY_ID,
    GET_STORE_PURCHASE_VARIATION_VIEW,
  } from "./actionType";


export const puchaseVariationApiResponseSuccess = (actionType, data) => ({ 
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const purchaseVariationApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getPurchaseVariations = (history) => ({
    type: GET_PURCHASE_VARIATION,
    payload:{history}
});

export const getPurchaseVariationsById = (id, history) => ({
    type: GET_PURCHASE_VARIATIONS_BY_ID,
    payload:{id, history}
});

export const getStorePurchaseVariationView = (history) => ({
    type: GET_STORE_PURCHASE_VARIATION_VIEW,
    payload:{history}
});

export const createPurchaseVariation = (purchaseVariation, history) => ({
    type: CREATE_PURCHASE_VARIATIONS,
    payload:{purchaseVariation, history}
});



