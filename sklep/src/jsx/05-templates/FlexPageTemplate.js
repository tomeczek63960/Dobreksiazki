import React from 'react';
import advertiseImg from 'assets/advertise.jpg';
import PageTemplate from 'jsx/05-templates/PageTemplate';
import PropTypes from 'prop-types';

const FlexPageTemplate = ( { children, title } ) => {
    return ( 
        <>
            <PageTemplate>
                <div className='advertise' >
                    <img src={advertiseImg} alt="Advertise"/>
                </div>
                <section className="flex-page-template">
                    <h4 className="flex-page-template__title">{title}</h4>
                    <div className='flex-page-template__content'>
                    {children}
                </div>
                </section>
            </PageTemplate>
        </>
     );
}
 
FlexPageTemplate.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.string
    ]).isRequired,
    title: PropTypes.string.isRequired
}
export default FlexPageTemplate;