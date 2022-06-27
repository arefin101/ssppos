import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_PRODUCT_LIST,
    CREATE_PRODUCT_PHONE,
    CREATE_PRODUCT_CHARGER,
    GET_PRODUCT_BRAND_SELECT,
    REMOVE_PRODUCT_CATEGORY,
    GET_PRODUCT_CATEGORY,
    GET_VARIATIONS_BY_PRODUCT,
  } from "./actionType";
  

export const productApiResponseSuccess = (actionType, data) => ({
    
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});


export const productApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});


export const getProducts = (history) => ({
    type: GET_PRODUCT_LIST,
    payload:{history}
})


export const getProductBrand = () => ({
    type: GET_PRODUCT_BRAND_SELECT,
})


export const createPhone = (fromdata , history) => {
    return {
        type: CREATE_PRODUCT_PHONE,
        payload: { fromdata , history },
    }
}

export const createCharger = (fromdata , history) => {
    return {
        type: CREATE_PRODUCT_CHARGER,
        payload: { fromdata , history },
    }
}

export const getVariationsByProduct = (id) => ({
    type: GET_VARIATIONS_BY_PRODUCT,
    payload: { id },
})

export const getProductCategory = (id,history) => ({
    type: GET_PRODUCT_CATEGORY,
    payload:{id , history}
});

export const removeProductCategory = () => ({
    type: REMOVE_PRODUCT_CATEGORY,
})

  
