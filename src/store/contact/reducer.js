import {
    GET_SUPPLIERS,
    CREATE_SUPPLIER,
    GET_CUSTOMER_LIST,
    CREATE_CUSTOMER,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_CUSTOMER_BY_ID,
    UPDATE_CUSTOMER_BY_ID,
    UPDATE_SUPPLIER_BY_ID,
    GET_SUPPLIER_BY_ID,
    GET_SHIPPING_ADDRESS,
    ADD_SHIPPING_ADDRESS,
    DELETE_SHIPPING_ADDRESS,
    EDIT_SHIPPING_ADDRESS,
    GET_CUSTOMER_CREDIT,
    GET_SUPPLIER_CREDIT,
  } from "./actionType";
  
  const INIT_STATE = {
    address: [],
    supplier: [],
    errorSupplier: {},
    customers: [],
    customer: [],
    error: {},
    errorCustomer: {},
    errorAddress: [],
    response: {},
    loading: false,
  };
  
  const Contact = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case CREATE_CUSTOMER:
                    return {
                        ...state,
                        response: action.payload.data,
                    };
                case GET_SUPPLIERS:
                    return {
                        ...state,
                        supplier: action.payload.data,
                    };
                case GET_CUSTOMER_LIST:
                    return {
                        ...state,
                        customers: action.payload.data,
                    };
                case GET_CUSTOMER_BY_ID:
                    return {
                        ...state,
                        customer: action.payload.data
                    }
                case GET_SUPPLIER_BY_ID:
                    return {
                        ...state,
                        supplier: action.payload.data
                    }
                case GET_SHIPPING_ADDRESS:
                    return {
                        ...state,
                        address: action.payload.data
                    }
                case ADD_SHIPPING_ADDRESS:
                    return {
                        ...state,
                        address: action.payload.data
                    }
                case DELETE_SHIPPING_ADDRESS:
                    return {
                        ...state,
                        address: action.payload.data
                    }
                case EDIT_SHIPPING_ADDRESS:
                    return {
                        ...state,
                        address: action.payload.data
                    }
                case UPDATE_CUSTOMER_BY_ID:
                    return {
                        ...state,
                        response: action.payload.data
                    }  
                case CREATE_SUPPLIER:
                    return {
                        ...state,
                        response: action.payload.data,
                    };
                case UPDATE_SUPPLIER_BY_ID:
                    return {
                        ...state,
                        response: action.payload.data
                    }  
                case GET_CUSTOMER_CREDIT:
                    return {
                        ...state,
                        response: action.payload.data
                    }   
                case GET_SUPPLIER_CREDIT:
                    return {
                        ...state,
                        response: action.payload.data
                    }  

                default:
                    return { ...state };
            }
        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case CREATE_CUSTOMER:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case CREATE_SUPPLIER:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_CUSTOMER_BY_ID:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_SUPPLIERS:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_SUPPLIER_BY_ID:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case GET_CUSTOMER_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                case UPDATE_CUSTOMER_BY_ID:
                    return {
                        ...state,
                        errorCustomer: action.payload.error,
                    };
                case UPDATE_SUPPLIER_BY_ID:
                    return {
                        ...state,
                        errorSupplier: action.payload.error,
                    };
                case GET_SHIPPING_ADDRESS:
                    return {
                        ...state,
                        error: action.payload.error
                    }
                case ADD_SHIPPING_ADDRESS:
                    return {
                        ...state,
                        errorAddress: action.payload.error
                    }
                case DELETE_SHIPPING_ADDRESS:
                    return {
                        ...state,
                        errorAddress: action.payload.error
                    }
                
                case GET_CUSTOMER_CREDIT:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                
                case GET_SUPPLIER_CREDIT:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                default:
                    return { ...state };
            }
            
        default:
            return { ...state };
    }
  };
  
  export default Contact;
  