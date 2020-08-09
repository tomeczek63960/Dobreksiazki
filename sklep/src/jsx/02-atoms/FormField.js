import React from 'react';
import PropTypes from 'prop-types';

const FormField = ( { inputType, inputName, placeholder, onChange, onBlur, inValid,touched } ) => {
    const changePlaceholderOnFocus = (e) =>{
        e.target.nextElementSibling.classList.add("form-field__placeholder--active");
    
    }
    const changePlaceholderOnBlur = (e) =>{
        if(e.target.value !== '') return;
        e.target.nextElementSibling.classList.remove('form-field__placeholder--active');
    }
    return ( 
        <div className="form-field">
            
            <input 
                type={ inputType } 
                name={ inputName } 
                id={ inputName } 
                className={`form-field__control ${ !touched && inValid && "form-field__control--failure" } `}
                onChange={ onChange } 
                onFocus={ changePlaceholderOnFocus } 
                onBlur={ (e)=>{
                    
                    changePlaceholderOnBlur(e)
                     onBlur(e)

                } }
            />

            <span className='form-field__placeholder'>{placeholder}</span>

        </div>
     );
}
 
FormField.propTypes = {
    inputType: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    inValid: PropTypes.string,
    touched: PropTypes.bool.isRequired,
}
export default FormField;