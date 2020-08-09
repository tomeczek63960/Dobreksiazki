import { removeAllBasketProducts } from 'jsx/01-redux/actions/basketActions';
import axios from 'axios';
import {
    PAYMENT_REQUEST,
    PAYMENT_SUCCESS,
    PAYMENT_FAILURE
} from '../types';

export const paymentRequest = ( token, product ) => async dispatch =>{
    dispatch( { type: PAYMENT_REQUEST } );

    try{

        const paymentRequest = await axios.post('/payments/checkout', { token, product: product } );
        const { status } = paymentRequest.data;   

        if( status === 'success' ){
            dispatch( { type: PAYMENT_SUCCESS, payload: { msg: 'Płatność dokonana pomyślnie' } } );
            dispatch( removeAllBasketProducts() )
            
        }else{

            dispatch( { type: PAYMENT_FAILURE, payload: { msg: "Problemy podczas płatności!"} } );
        }

    }catch(err){

        dispatch( { type: PAYMENT_FAILURE, payload: { msg: "Problemy podczas płatności!" } } );
    }

}