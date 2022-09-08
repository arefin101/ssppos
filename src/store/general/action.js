import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    HAS_PERMISSION,
} from "./actionType";


//commonSuccess
export const generalApiResponseSuccess = (actionType, data) => ({
    
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

// common error
export const generalApiResponseError = (actionType, error) => ({
        type: API_RESPONSE_ERROR,
        payload: { actionType, error },
    });
// check if has specific permisiion
export const hasPermission = (permissionName , history) => ({
    type: HAS_PERMISSION,
    payload: { permissionName , history}
})