import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logoutUser } from 'jsx/01-redux/actions/authActions';
import toggleClass from 'jsx/00-helpers/toggleClass'

const PageNav = () => {
    const submenuActiveClass = 'page-nav__navbar__submenu--active';
    const navbarRef  = useRef();
    const barsRef  = useRef();

    const dispatch = useDispatch();
    const history = useHistory();

    const token = useSelector(state => state.authReducer.token);
    const storeToken = localStorage.getItem('token');

    const toggleSubmenu = (e) =>{
        if(window.innerWidth >= 900 ) return;
        toggleClass( e.target.nextElementSibling, submenuActiveClass );
    }
    const toggleNav = () =>{
        toggleClass( navbarRef.current,'page-nav__navbar--active' );
        toggleClass( barsRef.current, 'bars--active' );
    }
   
    const logout = () =>{
        dispatch( logoutUser() );
        history.push(history.location.pathname);
    }

    return ( 
        <>
            <nav className="page-nav">
                <button className="bars" onClick={ toggleNav } ref={barsRef}>
                    <span className="bars__line"></span>
                </button>

                <ul className="page-nav__navbar" ref = {navbarRef}>

                    <li className='page-nav__navbar__item-wrapper'>

                        <button className="page-nav__navbar__toggler  page-nav__navbar__item"  onClick = { toggleSubmenu } >Kategorie</button>
                        
                        <ul className='page-nav__navbar__submenu' >

                            <li className='page-nav__navbar__submenu-back u-non-display--ms' onClick={ ( e ) => toggleClass( e.target.parentNode, submenuActiveClass ) }>KATEGORIE</li>
                            <li > <Link className='page-nav__navbar__submenu__item'  to = "/product/fantasy" onClick={toggleNav} >Fantasy </Link> </li>
                            <li > <Link className='page-nav__navbar__submenu__item'  to = "/product/historia" onClick={toggleNav} >Historia </Link> </li>
                            <li > <Link className='page-nav__navbar__submenu__item'  to = "/product/informatyka" onClick={toggleNav} >Informatyka </Link> </li>
                            <li > <Link className='page-nav__navbar__submenu__item'  to = "/product/bajka" onClick={toggleNav} >Bajki </Link> </li>
                            <li > <Link className='page-nav__navbar__submenu__item'  to = "/product/horror" onClick={toggleNav} >Horror </Link> </li>
                            <li > <Link className='page-nav__navbar__submenu__item'  to = "/product/dramat" onClick={toggleNav} >Dramat </Link> </li>
                            
                        </ul>
                    
                    </li>
                    <li className='page-nav__navbar__item-wrapper'>

                        <button className="page-nav__navbar__toggler  page-nav__navbar__item" onClick = {toggleSubmenu} >Filtry</button>

                        <ul className='page-nav__navbar__submenu u-non-display--ms' >
                            
                            <li className='page-nav__navbar__submenu-back u-non-display--ms' onClick={ ( e ) => toggleClass( e.target.parentNode, submenuActiveClass ) }>Filtry</li>
                            <li > <Link className='page-nav__navbar__submenu__item' to = {`/filter/opinionAmount`} onClick={toggleNav} >Najczęściej kupowane</Link> </li>
                            <li > <Link className='page-nav__navbar__submenu__item' to = {`/filter/discount`} onClick={toggleNav} >Promocje</Link> </li>
                            <li > <Link className='page-nav__navbar__submenu__item' to = {`/filter/rates`} onClick={toggleNav} >Najlepiej oceniane</Link> </li>

                        </ul>
                    
                    </li>
                    <li className='page-nav__navbar__item-wrapper'>
                        <Link to='/about' className='page-nav__navbar__item' onClick={toggleNav}>O nas</Link>
                    </li>
                    <li>
                        {
                            ( token || storeToken ) 
                                ?
                                <>
                                    <button onClick={ logout } className='page-nav__btn--ms u-display--ms'>Wyloguj</button>
                                    <button onClick={ logout } className='page-nav__btn--xs u-non-display--ms'>Wyloguj</button> 
                                </>
                                :
                                <>
                                    <Link to={ { pathname:'/login', state: history.location.pathname } } className='page-nav__btn--ms u-display--ms'>Zaloguj</Link>
                                    <Link to={ { pathname:'/login', state: history.location.pathname } } className='page-nav__btn--xs u-non-display--ms' onClick = {toggleNav} >Zaloguj</Link>
                                </>
                        }

    
                        
                    </li>
                </ul>

            </nav>
        </>
     );
}
 
export default PageNav;