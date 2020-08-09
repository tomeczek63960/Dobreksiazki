import {
    FETCH_TYPE_PRODUCTS_REQUEST,
    FETCH_TYPE_PRODUCTS_SUCCESS,
    FETCH_TYPE_PRODUCTS_FAILURE,

    FETCH_CURRENT_PRODUCT_REQUEST,
    FETCH_CURRENT_PRODUCT_SUCCESS,
    FETCH_CURRENT_PRODUCT_FAILURE,

    FETCH_HOME_PRODUCTS_REQUEST,
    FETCH_HOME_PRODUCTS_SUCCESS,
    FETCH_HOME_PRODUCTS_FAILURE,

    FIND_SEARCHED_BOOKS_REQUEST,
    FIND_SEARCHED_BOOKS_SUCCESS,
    FIND_SEARCHED_BOOKS_FAILURE,

} from '../types';



const productsReducer = (state = { loading:[] },action) => {
    switch(action.type){
            // category && author products
        case FETCH_TYPE_PRODUCTS_REQUEST:
            return {
                ...state,
                loading:[...state.loading, action.payload.loadingId],
                msg:{ type: null, description:null } 
            };
        case FETCH_TYPE_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                [action.payload.type]: action.payload.products,
                msg:{ type: null, description: null }
            };
        case FETCH_TYPE_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                msg:{ type:"error", description: action.payload.msg }
            }; 

            // product for productPage
        case FETCH_CURRENT_PRODUCT_REQUEST:
            return{
                ...state,
                loading:[...state.loading, action.payload.loadingId],
                msg:{ type: null, description:null } 
            };
        case FETCH_CURRENT_PRODUCT_SUCCESS:
            return{
                ...state,
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                currentProduct: action.payload.product,
                msg:{ type: null, description:null } 
            };
        case FETCH_CURRENT_PRODUCT_FAILURE:
            return{
                ...state,
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                msg:{ type: 'error', description: action.payload.msg } 

            };
       
            // home products
        case FETCH_HOME_PRODUCTS_REQUEST:
            return{
                ...state,
                loading:[...state.loading, action.payload.loadingId],
                msg:{ type: null, description: null } 

            };
        case FETCH_HOME_PRODUCTS_SUCCESS:
            return{
                ...state,
                opinionAmount:action.payload.opinionAmount,
                rates:action.payload.rates,
                discount:action.payload.discount,
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                msg:{ type: null, description: null } 

            };
        case FETCH_HOME_PRODUCTS_FAILURE:
            return{
                ...state,
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                msg:{ type: 'error', description: action.payload.msg } 

            };

            // searched products
        case FIND_SEARCHED_BOOKS_REQUEST:
            return{
                ...state,
                loading:[...state.loading, action.payload.loadingId],
                msg:{ type: null, description: null } 
            };
        case FIND_SEARCHED_BOOKS_SUCCESS:
            return{
                ...state,
                matchingBooks:action.payload.books,
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                msg:{ type: null, description: null } 

            };
        case FIND_SEARCHED_BOOKS_FAILURE:
            return{
                ...state,
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                msg:{ type: 'error', description: action.payload.msg } 
            };
            
        default : 
            return state; 
    }
};

export default productsReducer;