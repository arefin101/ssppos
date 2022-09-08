import {
    GET_SUPPLIERS,
    CREATE_SUPPLIER,
    GET_CUSTOMER_LIST,
    CREATE_CUSTOMER,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_CUSTOMER_BY_ID,
    UPDATE_CUSTOMER_BY_ID,
    GET_SUPPLIER_BY_ID,
    UPDATE_SUPPLIER_BY_ID,
    GET_SHIPPING_ADDRESS,
    ADD_SHIPPING_ADDRESS,
    DELETE_SHIPPING_ADDRESS,
    EDIT_SHIPPING_ADDRESS,
    GET_CUSTOMER_CREDIT,
    GET_SUPPLIER_CREDIT,
} from "./actionType";
  
  

export const contactApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const contactApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getSuppliers= (history) => ({
    type: GET_SUPPLIERS,
    payload:{history}
});

export const createSupplier = (supplier , history) => ({
    type: CREATE_SUPPLIER,
    payload: { supplier  , history}
});

export const getSupplierById = (id, history) => ({
    type: GET_SUPPLIER_BY_ID,
    payload: { id, history }
})

export const updateSupplierById = (id, data, history) => ({
    type: UPDATE_SUPPLIER_BY_ID,
    payload: { id, data, history }
});

export const getSupplierCredit = (id, history) => ({
    type: GET_SUPPLIER_CREDIT,
    payload: { id, history }
});

export const getCustomers = (history) => ({
    type: GET_CUSTOMER_LIST,
    payload:{history}
});

export const getCustomerById = (id, history) => ({
    type: GET_CUSTOMER_BY_ID,
    payload: { id, history }
});

export const updateCustomerById = (id, data, history) => ({
    type: UPDATE_CUSTOMER_BY_ID,
    payload: { id, data, history }
});

export const createCustomer = (customer , history) => ({
    type: CREATE_CUSTOMER,
    payload: { customer  , history},
});

export const getCustomerCredit = (id, history) => ({
    type: GET_CUSTOMER_CREDIT,
    payload: { id, history }
});

export const getShippingAddress = (id, history) => ({
    type: GET_SHIPPING_ADDRESS,
    payload: { id, history }
});

export const addShippingAddress = (id, shippingAddress, history) => ({
    type: ADD_SHIPPING_ADDRESS,
    payload: { id, shippingAddress, history }
});

export const editShippingAddress = (id, shippingAddress, history) => ({
    type: EDIT_SHIPPING_ADDRESS,
    payload: { id, shippingAddress, history }
});

export const deleteShippingAddress = (id, index, history) => ({
    type: DELETE_SHIPPING_ADDRESS,
    payload: { id, index, history }
});