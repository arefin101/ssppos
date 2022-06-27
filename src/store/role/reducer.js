import {
    GET_ROLE,
    CREATE_ROLE,
    GET_PERMISSION,
    ASSIGN_PERMISSION,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_ROLE_PERMISSION_SELECT,
} from "./actionType";

  
const INIT_STATE = {
    roles: [],
    permissions_role:{},
    permissionAssignError: [],
    errorRole: {},
    errorPermission: {},
    errorPermissionsRole:{},
    response: {},
};
  
const Role = (state = INIT_STATE, action) => {

    switch (action.type) {
        
        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {

                case GET_ROLE:
                    return {
                        ...state,
                        roles: action.payload.data,
                    };
                
                case CREATE_ROLE:
                    return {
                        ...state,
                        response: action.payload.data,
                    };

                case GET_PERMISSION: 
                    return {
                        ...state,
                        response: action.payload.data
                    };
                
                case ASSIGN_PERMISSION:
                    return {
                        ...state,
                        response: action.payload.data,
                    };

                case GET_ROLE_PERMISSION_SELECT:
                    return {
                        ...state,
                        permissions_role: action.payload.data,
                }; 

                default:
                    return { ...state };

            }

        case API_RESPONSE_ERROR:
            
            switch (action.payload.actionType) {
                
                case GET_ROLE:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case CREATE_ROLE:
                    return {
                        ...state,
                        errorRole: action.payload.error,
                    };

                case GET_PERMISSION:
                    return {
                        ...state,
                        errorPermission: action.payload.error,
                    };

                case ASSIGN_PERMISSION:
                    return {
                        ...state,
                        permissionAssignError: action.payload.error,
                    };

                case GET_ROLE_PERMISSION_SELECT:
                    return {
                        ...state,
                        errorPermissionsRole: action.payload.error,
                        };

                default:
                    return { ...state };

            }


        case GET_ROLE_PERMISSION_SELECT: {
            return {
                ...state,
            };
        }
            
        default:
            return { ...state };
            
    }

};
  
  export default Role;
  