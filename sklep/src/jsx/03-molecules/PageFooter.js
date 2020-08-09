import React from 'react';
import { Link } from 'react-router-dom';

const PageFooter = () => {
    return ( 
        <>
            <footer className="page-footer">
                <div className="center-wrapper page-footer__flex-container">
                    <div className='page-footer__row'>
                        <Link className='page-footer__link' to='/login'>Zaloguj</Link>
                        <Link className='page-footer__link' to='/register'>Utwórz konto</Link>
                        <Link className='page-footer__link' to='/basket'>Koszyk</Link>
                        <Link className='page-footer__link' to='/about'>O nas</Link>
                        <a href='#region' className='page-footer__link'> Pomoc</a>
                        <a href='#region' className='page-footer__link'>Polityka prywatności</a>
                    </div>
                    <div className="page-footer__payments-info page-footer__row">
                        <p className='page-footer__text'>Możliwość płatności:</p>
                        <img src="https://d3ogvdx946i4sr.cloudfront.net/assets/v2.19.12/img/payment-options.png" alt="Dostępne rodzaje płatności"/>
                    </div>

                    <div className='page-footer__row'>
                        <p className='page-footer__text'>Obserówj nas na:</p>
                        <div className="page-footer__social-media">
                            <a href="https://www.facebook.com" target='blank' className='icon--social-media icon--fb'>Facebook</a>
                            <a href="https://twitter.com" target='blank' className='icon--social-media icon--twitter'>Twitter</a>
                            <a href="https://www.youtube.com" target='blank' className='icon--social-media icon--yt'>Youtube</a>
                        </div>

                    </div>
                </div>
            </footer>
        </>
     );
}
 
export default PageFooter;