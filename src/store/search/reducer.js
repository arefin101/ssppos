import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    IMEI_SEARCH,
} from "./actionType";

const INIT_STATE = {
    response: [],
    error: {},
};

const Search = (state = INIT_STATE, action) => {
    
    switch (action.type) {

        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {

                case IMEI_SEARCH:
                    return {
                        ...state,
                        response: action.payload.data,
                    };
                default:
                    return { ...state };
            }
        
        case API_RESPONSE_ERROR:

            switch (action.payload.actionType) {

                case IMEI_SEARCH:
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
  
  export default Search;
  