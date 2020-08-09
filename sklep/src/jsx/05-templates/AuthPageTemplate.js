import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageLogo from 'jsx/02-atoms/PageLogo';

const AuthPageTemplate = ({children,login}) => {

    return ( 
        <>
            <div className='auth-page' >  

                <div className="center-wrapper auth-page__flex-container">
                    <PageLogo additionalClass = 'page-logo--large' />
                    <div className="auth-page__form">
                        <h5 className='auth-page__form__heading'>{login ? 'Logowanie' : "Rejestracja"}</h5>
                        <hr/>

                        {children}

                        <div className="auth-page__form__panel">
                            <h5 className='auth-page__form__heading'>{login ? "Rejestracja" : "Logowanie"}</h5>
                            <hr/>
                            <Link to = {login ? '/register' : "/login"} className='auth-page__btn'>{login ? "Załóż konto" : "Zaloguj"}</Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
     );
}

AuthPageTemplate.propTypes = {
    children:PropTypes.element.isRequired,
    login:PropTypes.bool
}

export default AuthPageTemplate;