import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({path, component }) => {
    
    const token = localStorage.getItem('token');

    return (          
        token ?
            <Route path={path}  component={component} />
            : 
            <Redirect to ='/login'/>
    );
}

PrivateRoute.propTypes = {
    path:PropTypes.string.isRequired,
    component:PropTypes.func.isRequired
}
 
export default PrivateRoute;