import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import FlexPageTemplate from 'jsx/05-templates/FlexPageTemplate';
import ProductCard from "jsx/03-molecules/ProductCard";
import { fetchTypeProducts } from 'jsx/01-redux/actions/productsAction';

const CategoryPage = () => {

    const dispatch = useDispatch();
    const routeMatch = useRouteMatch();
    const categoryProducts = useSelector(state => state.productsReducer[routeMatch.params.category]);

    useEffect(()=>{
        const category = routeMatch.params.category;
        dispatch(fetchTypeProducts( { filter:{category}, type:category } ) );
        
    },[routeMatch.params.category, dispatch]);
    
    return ( 
        <>
            <FlexPageTemplate title = {`Wszystkie w kategorii: ${categoryProducts ? categoryProducts[0].category : '' } ` } >
                {categoryProducts ? categoryProducts.map((item) => <ProductCard key={item._id} book={item} />) : ''}
            </FlexPageTemplate>
        </>
     );
}
 
export default CategoryPage;