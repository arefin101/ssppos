import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_TRANSACTION_RECORDS,
    GET_CASH_IN_RECORDS,
    GET_CASH_OUT_RECORDS,
    GET_VERIFICATION_RECORD,
    GET_USER_LOG,
} from "./actionType";

const INIT_STATE = {
    response: [],
    error: {},
    transactions: [],
    verificationRecord: [],
    userLog: [],
    cashIn: [],
    cashOut: [],
};

const Record = (state = INIT_STATE, action) => {
    
    switch (action.type) {

        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {

                case GET_TRANSACTION_RECORDS:
                    return {
                        ...state,
                        transactions: action.payload.data,
                    };
                case GET_CASH_IN_RECORDS:
                    return {
                        ...state,
                        cashIn: action.payload.data,
                    };
                case GET_CASH_OUT_RECORDS:
                    return {
                        ...state,
                        cashOut: action.payload.data,
                    };

                case GET_VERIFICATION_RECORD:
                    return {
                        ...state,
                        verificationRecord: action.payload.data
                    }

                case GET_USER_LOG:
                    return {
                        ...state,
                        userLog: action.payload.data
                    }
    
                default:
                    return { ...state };
            }
        
        case API_RESPONSE_ERROR:

            switch (action.payload.actionType) {

                case GET_TRANSACTION_RECORDS:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_CASH_IN_RECORDS:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_CASH_OUT_RECORDS:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_VERIFICATION_RECORD:
                    return {
                        ...state,
                        error: action.payload.error
                    }

                case GET_USER_LOG:
                    return {
                        ...state,
                        error: action.payload.error
                    }

                default:
                    return { ...state };

            }

        default:
            return { ...state };
        }

};
  
  export default Record;
  