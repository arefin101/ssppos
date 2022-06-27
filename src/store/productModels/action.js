import {
    GET_PRODUCT_MODEL_LIST,
    CREATE_PRODUCT_MODEL,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,

} from "./actionType";



export const productModelApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});


export const productModelApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getProductModels = (history) => ({
    type: GET_PRODUCT_MODEL_LIST,
    payload:{history}
})
  
export const createProductModel = (productModel , history) => {
    return {
        type: CREATE_PRODUCT_MODEL,
        payload: { productModel , history },
    }
}