import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_CAS_INDEX,
    GET_CAS_INDEX_VIEW,
    GET_SAS_INDEX,
    GET_SAS_INDEX_VIEW,
    GET_SPR_INDEX,
    GET_PPR_INDEX,
    GET_EPR_INDEX,
    GET_VERIFICATION_REPORT_LIST,
} from "./actionType";

const INIT_STATE = {
    response: [],
    error: {},
    casIndex: [],
    casIndexView: [],
    sasIndex: [],
    sasIndexView: [],
    sprIndex: [],
    pprIndex: [],
    eprIndex: [],
    verificationReportList: [],
};

const Report = (state = INIT_STATE, action) => {
    
    switch (action.type) {

        case API_RESPONSE_SUCCESS:

            switch (action.payload.actionType) {

                case GET_CAS_INDEX:
                    return {
                        ...state,
                        casIndex: action.payload.data,
                    };

                case GET_CAS_INDEX_VIEW:
                    return {
                        ...state,
                        casIndexView: action.payload.data,
                    };

                case GET_SAS_INDEX:
                    return {
                        ...state,
                        sasIndex: action.payload.data,
                    };

                case GET_SAS_INDEX_VIEW:
                    return {
                        ...state,
                        sasIndexView: action.payload.data,
                    };

                case GET_SPR_INDEX:
                    return {
                        ...state,
                        sprIndex: action.payload.data,
                    };

                case GET_PPR_INDEX:
                    return {
                        ...state,
                        pprIndex: action.payload.data,
                    };

                case GET_EPR_INDEX:
                    return {
                        ...state,
                        eprIndex: action.payload.data,
                    };

                case GET_VERIFICATION_REPORT_LIST:
                    return {
                        ...state,
                        verificationReportList: action.payload.data,
                    };

                default:
                    return { ...state };
            }
        
        case API_RESPONSE_ERROR:

            switch (action.payload.actionType) {

                case GET_CAS_INDEX:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                
                case GET_CAS_INDEX_VIEW:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_SAS_INDEX:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                
                case GET_SAS_INDEX_VIEW:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                
                case GET_SPR_INDEX:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                
                case GET_PPR_INDEX:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                
                case GET_EPR_INDEX:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                case GET_VERIFICATION_REPORT_LIST:
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
  
export default Report;
  