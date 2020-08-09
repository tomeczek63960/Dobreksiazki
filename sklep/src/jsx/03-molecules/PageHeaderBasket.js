import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom';
import calculateProductsPrice from 'jsx/00-helpers/calculateProductsPrice';

const PageHeaderBasket = () => {
    const [ totalBasketPrice, setTotalBasketPrice ] = useState(0);
    const basketProducts = useSelector(state => state.basketReducer.basketProducts);
    const token = localStorage.getItem('token');
    
    useEffect(()=>{
        const totalPrice = calculateProductsPrice( basketProducts );
        setTotalBasketPrice(totalPrice);

    },[basketProducts]);

    return ( 
        <>  
            <Link to={!token ? "/login" : "/basket"} className="page-header__basket" >
                <span className='page-header__basket__price' >{ totalBasketPrice } zł</span>
                <div className="hr" ></div>
                <span className="page-header__basket__icon" >{basketProducts ? basketProducts.length : 0} </span>
            </Link>
        </>
       );
};
 
export default PageHeaderBasket;