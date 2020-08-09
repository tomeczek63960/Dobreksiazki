import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { loginUserAction, registerUserAction } from 'jsx/01-redux/actions/authActions';
import { emailValidation, passwordValidation,  passwordConfirmValidation } from 'jsx/00-helpers/authValidation';
 
const Form = (props) => {   
    const dispatch = useDispatch();

    const [ touched, setTouched ] = useState( { email: true, password: true, passwordConfirm:true } );  
    const [ formData, setFormData ] = useState( {  email: "", password: "", passwordConfirm:"" } ); 
    const [errors, setErrors] = useState( { email: null, password: null, passwordConfirm: null } );

    const onChange = (e) =>{
        const type  = e.target.name;
        setFormData( {...formData, [type]: e.target.value } )

        let validationResult;

        if(type === 'email'){
            validationResult = emailValidation( e.target.value );
        }else if(type ==='password' ){
            validationResult = passwordValidation( e.target.value );
        }else if( type === 'passwordConfirm'){
            validationResult = passwordConfirmValidation( formData.password, e.target.value );
        }

        if( validationResult.valid ) return setErrors( { ...errors, [type]: null } );
        setErrors( {...errors, [type]: validationResult.msg } );
    }

    const onBlur = (e) =>{
        const type = e.target.name;
        setTouched( { ...touched, [type]: false } );

        let validationResult;

        if(type === 'email'){
            validationResult = emailValidation( e.target.value );
        }else if( type === 'password') {
            validationResult = passwordValidation( e.target.value );
        }else if( type === 'passwordConfirm'){
           validationResult = passwordConfirmValidation( formData.password, e.target.value );
        }     

        if(!validationResult) return;
        if( validationResult.valid ) return setErrors( { ...errors, [type]: null } );
        setErrors( { ...errors, [type]: validationResult.msg } );
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        setTouched( { email:false, password:false, passwordConfirm:false } );

        const emailValidationResult = emailValidation( formData.email );
        const passwordValidationResult = passwordValidation( formData.password );
        let passwordConfirmValidationResult = { valid: true, msg: null };

        if(props.action.includes('/register')){
            passwordConfirmValidationResult = passwordConfirmValidation( formData.password, formData.passwordConfirm );
        }

        setErrors({
            email: emailValidationResult.msg, 
            password: passwordValidationResult.msg,
            passwordConfirm: passwordConfirmValidationResult.msg
        });

        if( !emailValidationResult.valid || !passwordValidationResult.valid || !passwordConfirmValidationResult.valid ){
            return;
        };

        if(props.action.includes('/login')){

            const user = {
                email:formData.email,
                password:formData.password
            };
            dispatch( loginUserAction( user ) );

        }else if(props.action.includes('/register')){
            
            const newUser = {
                email: formData.email, 
                password: formData.password,
                passwordConfirm:formData.passwordConfirm 
            } 
            dispatch( registerUserAction( newUser ) );
        }

    }

    return (
        <form className='auth-form' action={props.action} onSubmit={onSubmit} autoComplete='off'  noValidate>  
            {
                props.children({ 
                        onChange,
                        onBlur,
                        errors:errors,
                        touched:touched
                    })
            }
        </form>

    )
      
}

Form.propTypes = {
    action:PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
}

export default Form;