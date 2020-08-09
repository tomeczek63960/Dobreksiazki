import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from 'jsx/03-molecules/PageHeader';
import PageFooter from 'jsx/03-molecules/PageFooter';

const PageTemplate = ({children}) => {
    
    return ( 
        <>
            <PageHeader />
                <div className="center-wrapper">
                    {children}
                </div>
            <PageFooter/>
        </>
     );
}
 
PageTemplate.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default PageTemplate;