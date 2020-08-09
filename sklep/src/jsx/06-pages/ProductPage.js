import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';

import PageTemplate from 'jsx/05-templates/PageTemplate';
import SliderTemplate from 'jsx/05-templates/SliderTemplate';
import ProductCard from 'jsx/03-molecules/ProductCard';

import { fetchCurrentProduct, fetchTypeProducts } from 'jsx/01-redux/actions/productsAction';
import { addProductToBasket } from 'jsx/01-redux/actions/basketActions';


const ProductPage = () => {
    const routeMatch = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch();
    
    const token = localStorage.getItem("token");

    const currentProduct = useSelector( state => state.productsReducer.currentProduct ); 
    const categoryProducts = useSelector(state => state.productsReducer[routeMatch.params.category]);
    
    const addProductToBasketAction = async ( book ) =>{
        
        if(!token){
            return history.push( '/login', history.location.pathname );
        }else{
            await dispatch(addProductToBasket(book));
        }

    } 

    useEffect(()=>{

        dispatch(fetchCurrentProduct( routeMatch.params._id ) );
        dispatch(fetchTypeProducts( { filter: { category:routeMatch.params.category }, type:routeMatch.params.category } ) );
    
    },[routeMatch.params._id, routeMatch.params.category, dispatch]);

    return ( 
        <>
            <PageTemplate>
                {currentProduct && currentProduct.map(product =>{
                    const {_id,discount,img,title,rates,opinionAmount,author,price,publishingHouse,cover,languages,pages,description} = product;
                return(
                    <section key = { _id }>
                        <div className='product-page' >
                            <div className="product-page__img-wrapper">
                                <div className="product-page__img">
                                    { discount ? <div className="card__discount"><p >{discount}%<br/> off</p></div> :"" }

                                    <img src={img} alt="Book"/>
                                </div>
                            </div>
                            <div className="product-page__product">

                                <h3 className='product-page__product__title'>{title}</h3>

                                <div className="product-page__rates">

                                    <div className="rates-wrapper" >
                                        <div className="rates" style={{width: rates * 15}} ></div>
                                    </div>

                                    <span className='product-page__rates-opinion'>{rates} ( {opinionAmount} opinii )</span>
                                </div>
                                
                                <p className='product-page__product__author'>Autor: {author}</p>
                                <div className="product-page__social-media">
                                    <p>Udostępnij</p>
                                    <a href="https://www.facebook.com" target='blank' className="icon--social-media icon--fb">Facebook</a>
                                    <a href="https://twitter.com" target='blank' className="icon--social-media icon--twitter">Twitter</a>
                                    <a href="https://www.youtube.com" target='blank' className="icon--social-media icon--mail">Mail</a>
                                </div>
                                
                                <div className='product-page__price-wrapper u-display--sm'>
                                    <h4 className="product-page__price ">{(price - price * discount/100).toFixed(2)} zł</h4>
                                    {
                                        discount ? 
                                        <div className="product-page__price__content">
                                            <p className="product-page__price__discount">{price} zł</p>
                                            <p className='product-page__price__save'>{(price * discount/100).toFixed(2)} zł taniej</p>
                                        </div> : ""
                                    }
                                </div>
                                <button className="product-page__btn u-display--sm" onClick={() => addProductToBasketAction( product ) }>Do koszyka</button>

                            </div>


                            <div className='product-page__details--desctop '>
                                <p className="product-page__details__title">Detale</p>

                                <p className='product-page__details__info'> <span className='product-page__details__info-heading' >Wydawnictwo:</span> { publishingHouse }</p>
                                <p className='product-page__details__info'> <span className='product-page__details__info-heading' >Rok wydania:</span> 2018</p>
                                <p className='product-page__details__info'> <span className='product-page__details__info-heading' >Oprawa:</span>   { cover }</p>
                                <p className='product-page__details__info'> <span className='product-page__details__info-heading' >Język wydania:</span>  { languages }</p>
                                <p className='product-page__details__info'> <span className='product-page__details__info-heading' >Ilość stron:</span>  { pages }</p>
                            </div>

                            <div className="product-page__price-wrapper u-non-display--sm">
                                <h4 className="product-page__price">{(price - price * discount/100).toFixed(2)} zł</h4>
                            {
                            discount ? 
                                <div className="product-page__price__content">
                                    <p className="product-page__price__discount">{price} zł</p>
                                    <p className='product-page__price__save'>{(price * discount/100).toFixed(2)} zł taniej</p>
                                </div> : ""
                                }
                            </div>

                            <button className='product-page__btn u-non-display--sm' onClick = {() =>addProductToBasketAction( product ) } >Do koszyka</button>

                        </div>
                    
                        <div className="product-page__description ">
                            <span className='product-page__description__title'> Opis</span>
                            <p className='product-page__description__content'>{description}</p>

                        </div>    
                    
                        <div className='product-page__details'>
                            <p className='product-page__details__title'>Detale</p>

                            <p  className='product-page__details__info' > <span className='product-page__details__info-heading'>Wydawnictwo:</span> { publishingHouse } </p>
                            <p  className='product-page__details__info' > <span className='product-page__details__info-heading'>Rok wydania:</span> 2018 </p>
                            <p  className='product-page__details__info' > <span className='product-page__details__info-heading'>Oprawa: </span> { cover } </p>
                            <p  className='product-page__details__info' > <span className='product-page__details__info-heading'>Język wydania:</span> { languages } </p>
                            <p  className='product-page__details__info' > <span className='product-page__details__info-heading'>Ilość stron:</span>   { pages }</p>
                        </div>
                    </section>
                )})}

                <SliderTemplate sliderHeading="Wyszukiwania w tej samej kategorii">
                    {categoryProducts && currentProduct && categoryProducts.map((item) => 
                        currentProduct[0]._id !== item._id && <ProductCard key={item._id} book={item} />
                   )}
                </SliderTemplate>
            </PageTemplate>
        </>
     );
}
 
export default ProductPage;