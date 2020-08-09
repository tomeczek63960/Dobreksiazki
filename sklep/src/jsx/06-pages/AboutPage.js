import React from 'react';

import PageTemplate from 'jsx/05-templates/PageTemplate';
import MyGoogleMap from 'jsx/03-molecules/MyGoogleMap';
import aboutImg from 'assets/about-img.jpg';
import person1 from 'assets/person-1.jpg';
import person2 from 'assets/person-2.jpg';
import person3 from 'assets/person-3.jpg';

const AboutPage = () => {

    return ( 
        <>

            <PageTemplate>
                <article>
                    <div className="about-page__content">
                        <div className='about-page__content__img'>
                            <img src={aboutImg} alt=""/>
                        </div>

                        <div className='about-page__content__info'>
                            <h3>Jesteśmy tu dla was!</h3>
                            <p> 
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores distinctio et voluptatem tenetur eius labore molestias sunt veniam sequi, iste, totam laborum quam, vitae repudiandae dolor optio molestiae exercitationem? Quasi!
                            </p>
                        </div>
                    </div>

                    <div className="about-page__person-wrapper">
                        <h4 className='about-page__person__title'>Członkowie naszego zespołu: </h4>
                        <div className="about-page__flex-container">
                            <div className="about-page__person">
                                
                                <div className="about-page__person__img">
                                    <img src={person1} alt=""/>
                                </div>
                                <div>
                                    <p className="about-page__person__description">
                                        Lorem ipsum dolor sit amet, consectetur. Laboriosam aut magni optio minima esse!
                                    </p>
                                    <span className="about-page__person__name">Adam Woleńczuk</span>
                                </div>
                            </div>
                            <div className="about-page__person">
                                <div className="about-page__person__img">
                                    <img src={person2} alt=""/>
                                </div>
                                <div>
                                    <p className="about-page__person__description">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit suscipit?
                                    </p>
                                    <span className="about-page__person__name">Justyna Andrzejczyk</span>
                                </div>
                            </div>
                            <div className="about-page__person">
                                <div className="about-page__person__img">
                                    <img src={person3} alt=""/>
                                </div>
                                <div>
                                    <p className="about-page__person__description">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam.
                                    </p>
                                    <span className="about-page__person__name">Weronika Kowalczyk</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="google-map__wrapper">
                        <h3>Nasz sklep stacjonarny</h3>
                        
                        <MyGoogleMap
                            isMarkerShown
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA2wgJ9b9Rvff8oaSUYwsjgG0cmwybeIjU&v=3.exp&libraries=geometry,drawing,places`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}             
                        />
                    </div>
                </article>
            </PageTemplate>

        </>
     );
}
 
export default AboutPage;
