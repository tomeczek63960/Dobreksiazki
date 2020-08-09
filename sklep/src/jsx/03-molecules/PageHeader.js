import React from 'react';

import PageNav from 'jsx/03-molecules/PageNav';
import PageHeaderBasket from 'jsx/03-molecules/PageHeaderBasket';
import SearchForm from 'jsx/03-molecules/SearchForm';
import PageLogo from 'jsx/02-atoms/PageLogo';

const PageHeader = () => {
    return ( 
        <>
            <div className="page-header-wrapper">
                <header className="page-header">
                    <div className = 'page-header__content'>
                        <div className="center-wrapper">
                            <div className="page-header__content__flex-container">
                                <PageNav />
                                <PageLogo additionalClass = 'page-logo--non-display-ms' />
                                <PageHeaderBasket />
                            </div>
                        </div>
                    </div> 
                    
                    <SearchForm/>
                </header>
            </div>
        </>
     ); 
}
 
export default PageHeader;