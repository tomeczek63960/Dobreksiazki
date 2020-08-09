import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SliderTemplate = ( { children, sliderHeading } ) => {

    const [paginationDisabled, setPaginationDisabled] = useState({left:true,right:false});

    const changeSliderPosition = (e) => {
        const slider = e.target.parentElement;
        let scrollX = e.target.dataset.scroll;

        if(window.innerWidth > 900){
            scrollX = scrollX * 3
        }else if( window.innerWidth > 700){
            scrollX = scrollX * 2;
        }

        slider.scrollBy(scrollX ,0);

    }
    const hiddePagination  = (e) => {
        const sliderWidth = e.target.offsetWidth;
        const childrens = e.target.children.length -2;

        const slidElement = document.querySelector('.card-wrapper');
        const widthOneSliderElement = slidElement.offsetWidth;
        const totalWidth = childrens * widthOneSliderElement ;
        const scrollLeftPosition = e.target.scrollLeft;

        if(totalWidth - sliderWidth - widthOneSliderElement / 2 <= e.target.scrollLeft){
            setPaginationDisabled({...paginationDisabled ,right:true});
        }else if(scrollLeftPosition < 160){
            setPaginationDisabled({...paginationDisabled ,left:true});
        }else{
            setPaginationDisabled({right:false ,left:false});
        }
    }

    return (  
        <>
            <section  className="section-slider">
                <h4 className='section-slider__heading'>{sliderHeading}</h4>
                <div className="slider" onScroll={hiddePagination}>
                    <span className={`slider-pagination__left ${paginationDisabled.left ? 'slider-pagination--disabled' : ""}`} onClick={changeSliderPosition} data-scroll={-260}> </span>
                    <span className={`slider-pagination__right ${paginationDisabled.right ? 'slider-pagination--disabled' : ""}`}  onClick={changeSliderPosition} data-scroll={260}> </span>

                    {children}
                </div>
            </section>
        </>
    );
}

SliderTemplate.propTypes = {
    children:PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    sliderHeading:PropTypes.string.isRequired
}

 
export default SliderTemplate;