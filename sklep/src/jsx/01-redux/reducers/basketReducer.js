import {
    FETCH_BASKET_PRODUCTS_REQUEST,
    FETCH_BASKET_PRODUCTS_SUCCESS,
    FETCH_BASKET_PRODUCTS_FAILURE,

    REMOVE_BASKET_PRODUCT_REQUEST,
    REMOVE_BASKET_PRODUCT_SUCCESS,
    REMOVE_BASKET_PRODUCT_FAILURE,

    ADD_PRODUCT_TO_BASKET_REQUEST,
    ADD_PRODUCT_TO_BASKET_SUCCESS,
    ADD_PRODUCT_TO_BASKET_FAILURE,

    CHANGE_AMOUNT_IN_BASKET_REQUEST,
    CHANGE_AMOUNT_IN_BASKET_SUCCESS,
    CHANGE_AMOUNT_IN_BASKET_FAILURE,

    REMOVE_ALL_BASKET_PRODUCTS_REQUEST,
    REMOVE_ALL_BASKET_PRODUCTS_SUCCESS,
    REMOVE_ALL_BASKET_PRODUCTS_FAILURE,
    
    PAYMENT_REQUEST,
    PAYMENT_SUCCESS,
    PAYMENT_FAILURE,
} from '../types';



const basketReducer = (state = {basketProducts:[], loading:[]},action) => {
    switch(action.type){

        case FETCH_BASKET_PRODUCTS_REQUEST:
            return{
                ...state,
                loading:[...state.loading, action.payload.loadingId],
                msg: { type: null, description: null}
            };
        case FETCH_BASKET_PRODUCTS_SUCCESS:
            return{
                ...state,
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                basketProducts:action.payload.products,
                msg: { type: null, description: null}
            };
        case FETCH_BASKET_PRODUCTS_FAILURE:
            return{
                ...state,
                basketProducts:[],
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
            };

        case REMOVE_BASKET_PRODUCT_REQUEST:
            return{
                ...state,
                loading:[...state.loading, action.payload.loadingId],
                msg: { type: null, description: null}

            };
        case REMOVE_BASKET_PRODUCT_SUCCESS:
            return{
                ...state,
                basketProducts: state.basketProducts.filter(product => product.title !== action.payload.title),
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                msg: { type: null, description: null}


            };
        case REMOVE_BASKET_PRODUCT_FAILURE:
            return{
                ...state,
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                msg: { type: 'error', description: action.payload.msg }
            };

        case ADD_PRODUCT_TO_BASKET_REQUEST:
            return{
                ...state,
                loading:[...state.loading, action.payload.loadingId],
                msg: { type: null, description: null}

            };
        case ADD_PRODUCT_TO_BASKET_SUCCESS:{
            const ismatching = state.basketProducts.some(item => item._id === action.payload.product._id);
            let newArr;

            if(ismatching){
                newArr = state.basketProducts.map(item =>{
                    if(item._id === action.payload.product._id){
                        item.amountInBasket += 1;
                    }
                    return item;
                })
            }

            return{
                ...state,
                basketProducts: ismatching ? newArr : [...state.basketProducts, action.payload.product],
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                msg: { type: null, description: null}


            };
        };
        case ADD_PRODUCT_TO_BASKET_FAILURE:
            return{
                ...state,
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                msg: { type: 'error', description: action.payload.msg }
            };

        case CHANGE_AMOUNT_IN_BASKET_REQUEST:
            return{
                ...state,
                loading:[...state.loading, action.payload.loadingId],
                msg: { type: null, description: null}

            };
        case CHANGE_AMOUNT_IN_BASKET_SUCCESS:
            return{
                ...state,
                basketProducts: state.basketProducts.map(product =>{
                    if(product.title === action.payload.title){
                        product.amountInBasket = action.payload.amountInBasket
                    }
                    return product
                }),
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                msg: { type: null, description: null}


            };
        case CHANGE_AMOUNT_IN_BASKET_FAILURE:
            return{
                ...state,
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                msg: { type: 'error', description: action.payload.msg }
            };
  
        case REMOVE_ALL_BASKET_PRODUCTS_REQUEST:
            return {
                ...state,
                loading:[...state.loading, action.payload.loadingId],
                msg: { type: null, description: null}
            };
        case REMOVE_ALL_BASKET_PRODUCTS_SUCCESS:
            return{
                ...state,
                basketProducts:[],
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                msg: { type: null, description: null}
            };
        case REMOVE_ALL_BASKET_PRODUCTS_FAILURE:
            return{
                ...state,
                loading: state.loading.filter(loadingItemId => loadingItemId !== action.payload.loadingId),
                msg: { type: 'error', description: action.payload.msg }
            };
        
        case PAYMENT_REQUEST:
            return{
                ...state,
                msg: { type: null, description: null }
            };
        case PAYMENT_SUCCESS:
            return{
                ...state,
                msg: { type: 'success', description: action.payload.msg }
            };
        case PAYMENT_FAILURE:
            return{
                ...state,
                msg: { type: 'error', description: action.payload.msg }
            };
      
        default : 
            return state; 
    }
};

export default basketReducer;