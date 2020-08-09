import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AuthPageTemplate from 'jsx/05-templates/AuthPageTemplate';
import Form from 'jsx/04-organisms/Form';
import FormField from 'jsx/02-atoms/FormField';
import ErrorInputMessage from 'jsx/02-atoms/ErrorInputMessage';


const LoginPage = () => {

    const history = useHistory();
    const token = useSelector(state => state.authReducer.token);
    const storeToken = localStorage.getItem('token');
    
    return ( 
        (token || storeToken) ? <Redirect to = {history.location.state || '/'}/> :
        <>
            <AuthPageTemplate login={true}>
               
                <Form action = 'auth/login'>
                    {({
                        onChange,
                        onBlur,
                        errors,
                        touched
                    }) => (
                            <>
                                <div className="form-field__wrapper">
                                    <FormField 
                                        inputType='email' 
                                        inputName='email' 
                                        placeholder='E-mail:' 

                                        onChange={ onChange } 
                                        onBlur={ onBlur }
                                        
                                        touched = { touched.email }
                                        inValid = { errors.email }
                                    />

                                    { !touched.email && <ErrorInputMessage msg={ errors.email } /> }
                                </div>                                    
                                
                                <div className="form-field__wrapper">
                                    <FormField 
                                        inputType='password' 
                                        inputName='password' 
                                        placeholder='Hasło:' 

                                        onChange={ onChange } 
                                        onBlur={ onBlur }
                                        
                                        touched = { touched.password }
                                        inValid = {errors.password}
                                        
                                    />

                                    { !touched.password && <ErrorInputMessage msg={ errors.password } /> }
                                </div>                                    
                                
                                <button type='submit' className='auth-page__btn'>Zaloguj się</button>
                            </>
                        )
                    }

                </Form>

            </AuthPageTemplate>
        </>

     );
}
 
export default LoginPage;
