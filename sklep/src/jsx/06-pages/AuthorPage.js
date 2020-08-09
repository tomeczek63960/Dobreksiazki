import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import FlexPageTemplate from 'jsx/05-templates/FlexPageTemplate';
import ProductCard from "jsx/03-molecules/ProductCard";
import { fetchTypeProducts } from 'jsx/01-redux/actions/productsAction';

const AuthorPage = () => {

    const dispatch = useDispatch();
    const routeMatch = useRouteMatch();
    const authorProducts = useSelector(state => state.productsReducer.author);

    useEffect(()=>{
        const author = routeMatch.params.name;
        dispatch(fetchTypeProducts( { filter:{ author }, type: 'author' } ) );
    },[routeMatch.params.name, dispatch]);
    
    return ( 
        <>
            <FlexPageTemplate title = {`Autor: ${routeMatch.params.name}`} >
                {authorProducts ? authorProducts.map((item) => <ProductCard key={item._id} book={item}  />) : ''}
            </FlexPageTemplate>
        </>
     );
}
 
export default AuthorPage;