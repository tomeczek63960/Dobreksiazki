const calculateProductsPrice = (arr) =>{
    let totalPrice = 0;

    arr && arr.forEach( ( { discount, price, amountInBasket } ) =>{
        if( discount ){
            const productPrice = price - ( price * discount / 100 );
            totalPrice += productPrice * amountInBasket;
        }else{
            totalPrice += price * amountInBasket;
        }
    });
    return totalPrice === 0 ? totalPrice : totalPrice.toFixed(2);
}

export default calculateProductsPrice;