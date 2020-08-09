import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import FlexPageTemplate from 'jsx/05-templates/FlexPageTemplate';
import ProductCard from "jsx/03-molecules/ProductCard";

const FilterPage = () => {
    const names = {
        opinionAmount:"Najczęściej kupowane",
        rates:"Najlepiej oceniane",
        discount:"Promocje"
    }
    const routeMatch = useRouteMatch();
    const filterProducts = useSelector(state => state.productsReducer[routeMatch.params.filter]);

    return ( 
        <>
            <FlexPageTemplate title = { `Wyszukiwania dla: ${names[routeMatch.params.filter]} ` }>
                {filterProducts ? filterProducts.map((item) => <ProductCard key={item._id} book={item} />) : ''}
            </FlexPageTemplate>
        </>
     );
}
 
export default FilterPage;