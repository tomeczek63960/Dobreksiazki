import React, { useState, useEffect } from 'react';
import {  useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import StripeCheckout from 'react-stripe-checkout';

import PageTemplate from 'jsx/05-templates/PageTemplate';
import { changeAmountInBasket, removeBasketProduct } from 'jsx/01-redux/actions/basketActions';
import { paymentRequest } from 'jsx/01-redux/actions/paymentActions';
import calculateProductsPrice from 'jsx/00-helpers/calculateProductsPrice';

const BasketPage = () => {
    const dispatch = useDispatch();
    const [totalBasketPrice, setTotalBasketPrice] = useState(0);
    const basketProducts = useSelector(state => state.basketReducer.basketProducts);

    const changeAmountInBasketAction = (title,amountInBasket,type) =>{

        const amount = type === 'increase' ? amountInBasket + 1 : amountInBasket -1;
        if(amount === 0 ) return;
        dispatch(changeAmountInBasket( { title, amountInBasket:amount } ) );
    }

    const removeBasketProductAction = ( title ) =>{
        dispatch( removeBasketProduct( title ) );
    }

    const handleToken = ( token ) =>{
        
        const product = {
            name:"books",
            price:Math.round( totalBasketPrice )
        }

        dispatch( paymentRequest( token, product ) ); 
    }

    useEffect(()=>{
        const totalPrice = calculateProductsPrice(basketProducts)
        setTotalBasketPrice(totalPrice);

    },[basketProducts]);
  
    return ( 
        <PageTemplate>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                <article className="basket-page">
                    <h4 className='basket-page__title'>Twój koszyk ({(basketProducts && basketProducts.length) || 0}) </h4>
                    {basketProducts && basketProducts.map( ( { _id, img, title, author, price, discount, rates, opinionAmount, amountInBasket } ) =>

                        <div className="basket-page__product" key = { _id }>
                                            
                            <div className="basket-page__img">  
                                <img  src={img} alt=""/>
                            </div>

                            <div className="basket-page__data">

                                <h3 className='basket-page__product__title'>{title}</h3>
                                <div className="basket-page__rates">

                                    <div className='rates-wrapper'>
                                        <div className="rates" style={{width: rates * 15}} ></div>
                                    </div>

                                    <span className='basket-page__rates-opinion'>{rates} ( {opinionAmount} opinii )</span>
                                </div>
                                
                                <p className='basket-page__product__author'>Autor: {author}</p>
                                <div className="basket-page__price-wrapper">
                                    <p className="basket-page__price">{(price - price * discount / 100 ).toFixed(2)} zł</p>
                                    {
                                        discount ? <p className="basket-page__price__discount">{price} zł</p> :""
                                    }
                                </div>

                            </div>

                            <div className="basket-page__details-info">
                            <p className='basket-page__details-info__price'>{discount ? ((price - price * discount / 100) * amountInBasket).toFixed(2) : (price * amountInBasket).toFixed(2) } zł</p>
                            <div className="basket-page__details-info__input">
                                <button onClick={() => changeAmountInBasketAction(title,amountInBasket,'increase') }>+</button>
                                {/* <input type="number" name="num" id="num" value={amountInBasket} disabled/> */}
                                <span type="number" name="num" id="num">{amountInBasket}</span>
                                <button onClick={() => changeAmountInBasketAction(title,amountInBasket,'decrease') }>-</button>
                            </div>
                            <button className='basket-page__btn' onClick={()=>removeBasketProductAction(title)} >Usuń</button>
                            </div>

                        </div>

                    )}

                    <div className="basket-page__payment-wrapper">
                        <div className="basket-page__payment-card__info">
                            <p className='basket-page__payment-success'>card success: 4242 4242 4242 4242 </p>
                            <p className='basket-page__payment-failure'>card failure: 4000 0027 6000 3184 </p>
                        </div>
                        <span className='basket-page__payment__price'>{ totalBasketPrice } zł</span>

                        <StripeCheckout 
                            stripeKey='pk_test_Hbh4N8yzPt7K0S8vZnLbPNCY00qgv4xKHd'
                            token={handleToken}
                            billingAddress
                            currency="PLN"
                            shippingAddress
                            amount={totalBasketPrice * 100}
                            name='Books'
                            label="Złóż zamówienie" 
                        />

                    </div>
                </article>

                    
        </PageTemplate>
     );
}
 
export default BasketPage;