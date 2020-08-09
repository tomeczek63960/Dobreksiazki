import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import PageLogo from 'jsx/02-atoms/PageLogo';

const SearchForm = () =>{
    const [ formData, setFormData ] = useState('');
    const history = useHistory();

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(formData === '') return;
        
        history.push(`/search/${formData}`, );   
    }

    return(
        <div className='search-form__wrapper center-wrapper'>
            <PageLogo additionalClass = 'page-logo--display-ms' />

            <form action="/search" autoComplete='off' className='search-form' onSubmit={handleSubmit}>
                    <input 
                        type="text"  
                        name='search' 
                        id='search' 
                        className='search-form__input' 
                        placeholder='Wyszukaj nazwę / kategorię / autora '
                        onChange = { e => setFormData( e.target.value ) }    
                    />
                    <button type='submit' className='search-form__btn'> search </button>
            </form>
        </div>
    );
}

export default SearchForm;