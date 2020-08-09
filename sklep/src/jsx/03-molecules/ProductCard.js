import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link,useHistory } from 'react-router-dom';
import { addProductToBasket} from 'jsx/01-redux/actions/basketActions';

const ProductCard = ( { book } ) => {
    const { _id,img, category, title, author, price, discount, rates } = book; 

    const dispatch = useDispatch();
    const history = useHistory();
    const token = localStorage.getItem('token'); 
    let shortCutAuthor;

    if(author.length > 16){
        shortCutAuthor = author.split(" ");
        shortCutAuthor[ shortCutAuthor.length - 1 ] = shortCutAuthor[shortCutAuthor.length -1 ][0];
        
        if(shortCutAuthor.length > 2 ){
            shortCutAuthor[ shortCutAuthor.length -2 ] = shortCutAuthor[ shortCutAuthor.length -2 ][0]; 
        }

        shortCutAuthor = shortCutAuthor.join(" ")

    }

    const addProductToBasketAction = async () =>{
        const prevLocation = history.location.pathname;

        if(!token){
          return  history.push( '/login', prevLocation );
            
        }else{ 
            await dispatch( addProductToBasket( book ) );
        }
    }

    return (  
        <>            
          <div className="card-wrapper">
                <div className="card">

                    <div className="card__img">
                        <Link to = { `/product/${category}/${ _id }` } >
                            { discount ? <div className="card__discount"><p >{discount}%<br/> off</p></div> :"" }
                            <img src={img} alt="book"/>
                        </Link>

                    </div>
                   
                    <h5 className="card__title"> <Link to= { `/product/${category}/${ _id }` } >{ title }</Link></h5>
                    <p className="card__author"> <Link to={ `/author/${author}` } >{shortCutAuthor ? shortCutAuthor : author} </Link> </p>

                    <div className="rates" style = { { width: rates * 15 } } ></div>
                    <div className="card__price-wrapper">
                        <span className="card__price">{ ( price - price * discount / 100 ).toFixed(2) } zł</span>
                        {discount ? <p className="card__price-discount">{price} zł</p> : ''}
                    </div>
                    <button className="card__btn" onClick={ addProductToBasketAction } >Do koszyka</button>
                </div>
            </div>
        </>
    );
}

ProductCard.propTypes = {

    book:PropTypes.shape({
        _id: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        discount: PropTypes.number.isRequired,
        rates: PropTypes.number.isRequired,
        opinionAmount: PropTypes.number.isRequired,
        publishingHouse: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        languages: PropTypes.string.isRequired,
        pages: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired
    })
}
 
export default ProductCard;