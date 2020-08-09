import axios from 'axios';
import generateId from 'jsx/00-helpers/generateId';

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


export const registerUserAction = ( formData ) => async (dispatch) =>{
    const authForm = document.querySelector('.auth-form');
    const loadingId = generateId();

    dispatch( { type: REGISTER_USER_REQUEST, payload:{loadingId} } );

    try{
        const registerUserRequest = await axios.post('/auth/register',formData);
        const { msg } = registerUserRequest.data;
        await authForm.reset();
        
        dispatch( { type:REGISTER_USER_SUCCES, payload: { loadingId, msg } } );

    }catch(err){
        const { msg } = err.response.data;
        dispatch( { type: REGISTER_USER_FAILURE, payload: { loadingId, msg } } );
      
    }

};

export const loginUserAction = (formData) => async (dispatch) =>{
    const loadingId = generateId()
    dispatch( { type: LOGIN_USER_REQUEST, payload: { loadingId } } );
    
    try{
        const loginUserRequest = await axios.post( '/auth/login', formData );
        const { token } = loginUserRequest.data;
        
        localStorage.setItem('token',token)
        dispatch( { type: SET_TOKEN, payload: { token } } );
        dispatch( { type: LOGIN_USER_SUCCES, payload: { loadingId }  } );

    }catch(err){

        const { msg } = err.response.data;  
        dispatch( { type: LOGIN_USER_FAILURE, payload: { loadingId, msg: msg || 'problemy z serverem' } } );
    
    }

}

export const logoutUser = () => async (dispatch) =>{
    localStorage.removeItem('token');
    dispatch( { type: LOGOUT_USER } );
}