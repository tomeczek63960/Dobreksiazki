import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PageLogo = ({additionalClass}) => {
    return ( 
        <>
            <Link to = '/' className={`page-logo ${additionalClass && additionalClass}`}>Dobre<br/>Książki</Link>
        </>
     );
}

PageLogo.propTypes = {
    additionalClass: PropTypes.string
}

export default PageLogo;