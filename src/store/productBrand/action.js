import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_BRAND_LIST,
    CREATE_BRAND,
} from "./actionType";


export const brandApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const brandApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getBrands = (history) => ({
    type: GET_BRAND_LIST,
    payload:{history}
})

export const createBrand = (formdata , history) => {
    return {
        type: CREATE_BRAND,
        payload: { formdata , history },
    }
}

  