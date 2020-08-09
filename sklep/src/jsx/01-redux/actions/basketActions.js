import axios from 'axios';
import generateId from 'jsx/00-helpers/generateId';
import {
    FETCH_BASKET_PRODUCTS_REQUEST,
    FETCH_BASKET_PRODUCTS_SUCCESS,
    FETCH_BASKET_PRODUCTS_FAILURE,

    ADD_PRODUCT_TO_BASKET_REQUEST,
    ADD_PRODUCT_TO_BASKET_SUCCESS,
    ADD_PRODUCT_TO_BASKET_FAILURE,

    CHANGE_AMOUNT_IN_BASKET_REQUEST,
    CHANGE_AMOUNT_IN_BASKET_SUCCESS,
    CHANGE_AMOUNT_IN_BASKET_FAILURE,

    REMOVE_BASKET_PRODUCT_REQUEST,
    REMOVE_BASKET_PRODUCT_SUCCESS,
    REMOVE_BASKET_PRODUCT_FAILURE,

    REMOVE_ALL_BASKET_PRODUCTS_REQUEST,
    REMOVE_ALL_BASKET_PRODUCTS_SUCCESS,
    REMOVE_ALL_BASKET_PRODUCTS_FAILURE,

} from 'jsx/01-redux/types';


export const fetchBasketProducts = () => async dispatch =>{
    const loadingId = generateId();
    dispatch({type: FETCH_BASKET_PRODUCTS_REQUEST, payload: { loadingId }  });

    try{
        const token = { "token": localStorage.getItem('token') };

        const basketProductsRequest = await axios.get('/basket/fetch-products', { headers: token } );
        const basketProducts = basketProductsRequest.data;

        dispatch({type: FETCH_BASKET_PRODUCTS_SUCCESS, payload: { products: basketProducts, loadingId } } );

    }catch(err){
        const msg = err.response.data.msg || "Problemy z serverem";
        dispatch({type: FETCH_BASKET_PRODUCTS_FAILURE, payload: { loadingId, msg } } );

    }
}

export const addProductToBasket = (book) => async dispatch =>{
    const loadingId = generateId();
    dispatch( { type:ADD_PRODUCT_TO_BASKET_REQUEST, payload: { loadingId }  } );

    try{
        const token = { "token": localStorage.getItem('token') };

        const addToBasketRequest = await axios.post('/basket/add-product', book, { headers: token } );
        const { addedProduct } = await addToBasketRequest.data;

        await dispatch( { type: ADD_PRODUCT_TO_BASKET_SUCCESS, payload: { product: addedProduct, loadingId } } ); 

    }catch(err){
        const msg = err.response.data.msg || "Problemy z serverem";
        dispatch( { type: ADD_PRODUCT_TO_BASKET_FAILURE, payload: { loadingId, msg }  } );
    
    }
}

export const changeAmountInBasket = ( { title, amountInBasket } ) => async dispatch =>{
    
    const loadingId = generateId();
    dispatch( { type:  CHANGE_AMOUNT_IN_BASKET_REQUEST, payload: { loadingId }  } );

    try{
        const token = { "token": localStorage.getItem('token') };
        await axios.put('/basket/change-amount', { title, amountInBasket }, { headers: token } );
      
        dispatch({type: CHANGE_AMOUNT_IN_BASKET_SUCCESS,payload:{ title, amountInBasket, loadingId }});

    }catch(err){
        const msg = err.response.data.msg || "Problemy z serverem";
        dispatch( { type:  CHANGE_AMOUNT_IN_BASKET_FAILURE, payload: { loadingId, msg } } );
    
    }
}

export const removeBasketProduct = ( title ) => async dispatch => {
    const loadingId = generateId();
    dispatch( { type: REMOVE_BASKET_PRODUCT_REQUEST, payload: { loadingId } } );

    try{
        const token = { "token": localStorage.getItem('token') };
        await axios.delete(`/basket/remove-product/${title}`, { headers: token });  
        
        dispatch( { type: REMOVE_BASKET_PRODUCT_SUCCESS, payload: { title, loadingId } } );

    }catch(err){
        const msg = err.response.data.msg || "Problemy z serverem";
        dispatch( { type: REMOVE_BASKET_PRODUCT_FAILURE, payload: { loadingId, msg } } );

    }
}

export const removeAllBasketProducts = () => async dispatch =>{
    const loadingId = generateId();
    dispatch( { type: REMOVE_ALL_BASKET_PRODUCTS_REQUEST, payload: { loadingId } } );
    
    try{
        const token = { "token": localStorage.getItem('token') };
        await axios.delete('/basket/remove-all-products', { headers: token } );

        dispatch( { type: REMOVE_ALL_BASKET_PRODUCTS_SUCCESS, payload: { loadingId } } );

    }catch(err){
        const msg = err.response.data.msg || "Problemy z serverem";
        dispatch( { type: REMOVE_ALL_BASKET_PRODUCTS_FAILURE, payload: { loadingId, msg } } );
    
    }

}

