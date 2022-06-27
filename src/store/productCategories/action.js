import {
    GET_PRODUCT_CATEGORY_LIST,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
} from "./actionType";


export const productCategoryApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});


export const productCategoryApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});


export const getProductCategoryList = (history) => ({
    type: GET_PRODUCT_CATEGORY_LIST,
    payload:{history}
})