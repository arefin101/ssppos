import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_USERS,
    ADD_USER,
    ADD_ROLE,
    GET_ROLE_BY_ID,
    GET_USER_BY_ID,
    UPDATE_USER_BY_ID,
    GET_CUA_LIST,
    CUA_ASSIGN,
    GET_CUA_ASSIGN_VIEW,
} from "./actionType";


const INIT_STATE = {
    users: [],
    user: [],
    error: {},
    response: {},
    list: {}
};


const User = (state = INIT_STATE, action) => {
    
    switch (action.type) {

        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {

                case GET_USERS:
                    return {
                        ...state,
                        users: action.payload.data,
                    };
                
                case ADD_USER:
                    return {
                        ...state,
                        response: action.payload.data,
                        error: {},
                    }

                case ADD_ROLE:
                    return {
                        ...state,
                        response: action.payload.data
                    }
                
                case GET_ROLE_BY_ID:
                    return {
                        ...state,
                        response: action.payload.data
                    };

                case GET_USER_BY_ID:
                    return {
                        ...state,
                        user: action.payload.data,
                    };

                case UPDATE_USER_BY_ID:
                    return {
                        ...state,
                        response: action.payload
                    }

                case GET_CUA_LIST:
                    return {
                        ...state,
                        list:action.payload.data,
                    };
                
                case CUA_ASSIGN:
                    return {
                        ...state,
                        response: action.payload.data,
                        error: {},
                    }

                case GET_CUA_ASSIGN_VIEW:
                    return {
                        ...state,
                        users: action.payload.data,
                    };

                default:
                    return { 
                        ...state 
                    };

            }

        case API_RESPONSE_ERROR:

            switch (action.payload.actionType) {

                case GET_USERS:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                
                case ADD_USER: 
                    return {
                        ...state,
                        error: action.payload.error,
                        response: {},
                    };

                case UPDATE_USER_BY_ID:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_CUA_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                
                case CUA_ASSIGN: 
                    return {
                        ...state,
                        error: action.payload.error,
                        response: {},
                    };

                case GET_CUA_ASSIGN_VIEW:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                default:
                    return { 
                        ...state
                    };

            }
        
        default:
            return { 
                ...state 
            };
            
    }

};

export default User;
