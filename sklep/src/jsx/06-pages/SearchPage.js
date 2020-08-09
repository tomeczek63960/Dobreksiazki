import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import FlexPageTemplate from 'jsx/05-templates/FlexPageTemplate';
import ProductCard from "jsx/03-molecules/ProductCard";
import { findSearchedBooks } from 'jsx/01-redux/actions/productsAction';

const SearchPage = () => {
    const dispatch = useDispatch();
    const routeMatch = useRouteMatch();

    const matchingBooks = useSelector( state => state.productsReducer.matchingBooks ); 
    
    useEffect(()=>{
        dispatch(findSearchedBooks(routeMatch.params.search));   
    },[routeMatch.params.search, dispatch]);

    return ( 
        <>
            <FlexPageTemplate title = { `Wyszukiwania dla: ${routeMatch.params.search}` }>
                {matchingBooks ? matchingBooks.map((item) => <ProductCard key={item._id} book={item} />) : ''}
            </FlexPageTemplate>
        </>
     );
}
 
export default SearchPage;