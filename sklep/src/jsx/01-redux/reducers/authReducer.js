import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCES,
    REGISTER_USER_FAILURE,

    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCES,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    SET_TOKEN
} from '../types';

const authReducer = ( state = { loading: [], msg:{} }, action ) => {
    switch(action.type){

    // register action
        case REGISTER_USER_REQUEST:
            return{
                ...state,
                loading:[...state.loading, action.payload.loadingId],
                msg: { type: null, description: null }
            };
        case REGISTER_USER_SUCCES:
            return {
                ...state,
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                msg: { type: 'success', description: action.payload.msg}
            };
        case REGISTER_USER_FAILURE:
            return{
                ...state,
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                msg: { type: "error", description: action.payload.msg }
            };

    // login actions
        case LOGIN_USER_REQUEST: 
            return{
                ...state,
                loading:[...state.loading, action.payload.loadingId],
                msg:{ type: null, description: null }
            };
        case LOGIN_USER_SUCCES:
            return{
                ...state,
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                msg:{ type: null, description: null }
            };
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                msg: { type: "error", description: action.payload.msg } 
            };

        case SET_TOKEN:
            return{
                ...state,
                token: action.payload.token
            };
        case LOGOUT_USER:
            return{
                ...state,
                token:null,
                msg:null
            };
        
        default : 
            return state; 
    }
}
export default authReducer;