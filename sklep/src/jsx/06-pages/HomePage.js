import React from 'react';
import { useSelector} from 'react-redux';

import PageTemplate from 'jsx/05-templates/PageTemplate';
import SliderTemplate from 'jsx/05-templates/SliderTemplate';
import ProductCard from "jsx/03-molecules/ProductCard";
import advertiseImg from 'assets/advertise.jpg';

const HomePage = () => {

    const products = useSelector(state => state.productsReducer);

    return ( 
        <>
            <PageTemplate>
                <div className='advertise' >
                    <img src={advertiseImg} alt="Advertise"/>
                </div>
                <main>
                    <SliderTemplate sliderHeading='Promocje'>
                        { products.discount && products.discount.map((item) => <ProductCard key={item._id} book={item} /> ) }
                    </SliderTemplate>

                    <SliderTemplate sliderHeading='Najlepiej oceniane'>
                        { products.rates && products.rates.map((item) => <ProductCard key={item._id} book={item} /> ) }
                    </SliderTemplate>

                    <SliderTemplate sliderHeading='Najczęściej kupowane'>
                        { products.opinionAmount && products.opinionAmount.map((item) => <ProductCard key={item._id} book={item} /> ) }
                    </SliderTemplate>
                </main>
            </PageTemplate>
        </>
     );
}
 
export default HomePage;