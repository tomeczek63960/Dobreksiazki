import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from 'jsx/07-privateRouts/PrivateRout';
import LoginPage from "jsx/06-pages/LoginPage";
import RegisterPage from "jsx/06-pages/RegisterPage";
import HomePage from "jsx/06-pages/HomePage";
import CategoryPage from "jsx/06-pages/CategoryPage";
import ProductPage from 'jsx/06-pages/ProductPage';
import AuthorPage from 'jsx/06-pages/AuthorPage';
import BasketPage from 'jsx/06-pages/BasketPage';
import FilterPage from 'jsx/06-pages/FilterPage';
import SearchPage from "jsx/06-pages/SearchPage";
import AboutPage from "jsx/06-pages/AboutPage";
import InfoContainer from "./03-molecules/InfoContainer";

const Root = () => {
   
    return ( 
        <>
           
            <InfoContainer/>
            <Router>
                <Switch>

                    <Route path='/' exact component={HomePage} />
                    <Route path='/login' component={LoginPage} />
                    <Route path ='/register' component={RegisterPage} />
                    <Route path ='/about' exact component={AboutPage} />
                   
                    <Route path ='/product/:category' exact component={CategoryPage} />
                    <Route path ='/product/:category/:_id' exact component={ProductPage} />

                    <Route path ='/author/:name' exact component={AuthorPage} />
                    <Route path ='/filter/:filter' exact component={FilterPage} />
                    <Route path ='/search/:search' exact component={SearchPage} />

                    <PrivateRoute path ='/basket' exact component={BasketPage} />
                </Switch>
            </Router>
        </>
     );
}
 
export default Root;