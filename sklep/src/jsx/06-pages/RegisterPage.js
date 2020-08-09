import React from 'react';

import AuthPageTemplate from 'jsx/05-templates/AuthPageTemplate';
import Form from 'jsx/04-organisms/Form';
import FormField from 'jsx/02-atoms/FormField';
import ErrorInputMessage from 'jsx/02-atoms/ErrorInputMessage';

const RegisterPage = () => {

    return ( 
        <>
            <AuthPageTemplate>
                <Form action="/register">
                    {({
                            onChange,
                            onBlur,
                            errors,
                            touched
                    })=>(

                        <>

                            <div className="form-field__wrapper">
                                <FormField 
                                    inputType='email'
                                    inputName='email'
                                    placeholder='E-mail:' 

                                    onChange = { onChange }
                                    onBlur ={ onBlur }

                                    touched = {touched.email}
                                    inValid= { errors.email }
                                />

                                {!touched.email && <ErrorInputMessage msg={errors.email} />}
                            </div>

                            <div className="form-field__wrapper">
                                
                                <FormField 
                                    inputType='password'
                                    inputName='password'
                                    placeholder='Hasło:' 

                                    onChange = { onChange }
                                    onBlur={ onBlur }

                                    touched = {touched.password}
                                    inValid={ errors.password }
                                />
                                
                                {!touched.password && <ErrorInputMessage msg={errors.password } /> }
                            </div>
                            
                            <div className="form-field__wrapper">
                                <FormField 
                                    inputType='password'
                                    inputName='passwordConfirm'
                                    placeholder='Potwierdź hasło:' 

                                    onChange = { onChange }
                                    onBlur={ onBlur }
                                    
                                    touched = {touched.passwordConfirm}
                                    inValid={ errors.passwordConfirm }
                                />

                                { !touched.passwordConfirm && <ErrorInputMessage msg={ errors.passwordConfirm } /> }
                            </div>

                            <button type='submit' className='auth-page__btn'>Załóż konto</button>
                        </>
                    )}
              
                </Form>
            </AuthPageTemplate>
        </>
     );
}
 
export default RegisterPage;