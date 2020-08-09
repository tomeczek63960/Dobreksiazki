import axios from 'axios';
import generateId from 'jsx/00-helpers/generateId';
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
    FIND_SEARCHED_BOOKS_FAILURE

} from 'jsx/01-redux/types';


export const fetchTypeProducts = ({filter,type}) => async dispatch =>{
    // category && author products
    const loadingId = generateId();
    dispatch( { type: FETCH_TYPE_PRODUCTS_REQUEST, payload:{loadingId} } );

    try{
        const productsRequest = await axios.get('/products/fetch-type-products', { headers: { "body": filter ? JSON.stringify(filter) : '' } });
        const products = await productsRequest.data;

        dispatch({ type: FETCH_TYPE_PRODUCTS_SUCCESS, payload: { products, type, loadingId } } );
     
    }catch(err){
        
        const msg  =  err.response.data.msg || "Problemy z serverem";
        dispatch( { type: FETCH_TYPE_PRODUCTS_FAILURE, payload: { loadingId, msg } } );

    }
}

export const fetchCurrentProduct = ( _id ) => async dispatch => {
    // productPage product
    const loadingId = generateId();
    dispatch( { type: FETCH_CURRENT_PRODUCT_REQUEST, payload: { loadingId } } );
    
    try{
        const productRequest = await axios.get(`/products/fetch-product/${ _id }`);
        const product = await productRequest.data;

        dispatch( { type: FETCH_CURRENT_PRODUCT_SUCCESS, payload: { product, loadingId } } );

    }catch(err){
        const msg = err.response.data.msg || "Problemy z serverem";
        dispatch( { type: FETCH_CURRENT_PRODUCT_FAILURE, msg } );
    
    }
}

export const fetchHomeProducts = () => async dispatch =>{
    // opinionAmount && rates && discount
    const loadingId = generateId();
    dispatch( { type: FETCH_HOME_PRODUCTS_REQUEST,  payload: { loadingId } } );
    
    try{
        const matchingProductsRequest = await axios.get('/products/fetch-home-products');
        const { opinionAmount, rates, discount } = matchingProductsRequest.data;
        
        dispatch( { type: FETCH_HOME_PRODUCTS_SUCCESS, payload: { opinionAmount, rates, discount, loadingId } } )

    }catch(err){
        const msg = err.response.data.msg || "Problemy z serverem";
        dispatch( { type: FETCH_HOME_PRODUCTS_FAILURE, payload: { loadingId, msg } } )

    }
}

export const findSearchedBooks = (formData) => async dispatch =>{
    // searched in pageHero searchForm
    const loadingId = generateId();
    dispatch( { type: FIND_SEARCHED_BOOKS_REQUEST, payload: { loadingId } } );

    try{
        const matchingBooksRequest = await axios.get(`/products/find-matching-books/${formData}`);
        const matchingBooks = matchingBooksRequest.data;

        dispatch({type: FIND_SEARCHED_BOOKS_SUCCESS, payload: { books: matchingBooks, loadingId } } );
        
    }catch( err ){
        const msg = err.response.data.msg || "Problemy z serverem";
        dispatch( { type: FIND_SEARCHED_BOOKS_FAILURE, payload: { loadingId, msg } } );

    }

}
