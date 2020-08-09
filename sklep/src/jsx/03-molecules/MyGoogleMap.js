import React, { useState } from 'react';
import { withScriptjs, GoogleMap, withGoogleMap , Marker, InfoWindow } from 'react-google-maps';
import markerIcon from 'jsx/../assets/reading.svg';

const MyGoogleMap  = withScriptjs(withGoogleMap((props) =>{

    const [isVisibleInfoWindow, setVisibilityForInfoWinodw] = useState( false );
    const handleInfoWindowVisibility = () => setVisibilityForInfoWinodw(!isVisibleInfoWindow);

    return(

        <div>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{  lat: 49.288217, lng: 18.907089 }}
            >

                 <Marker  
                    position={{ lat: 49.288217, lng: 18.907089 }}
                    onClick={handleInfoWindowVisibility}
                    icon={{
                        url: markerIcon,
                        scaledSize: new window.google.maps.Size(35,45)
                      }}
                 >
                    {isVisibleInfoWindow && (
                        <InfoWindow
                            onCloseClick={handleInfoWindowVisibility}
                        >
                            <>
                                <h4>Randomowa lokalizacja</h4>
                                <p> lat: 49.288217<br/> lng: 18.907089 </p>
                            </>
                        </InfoWindow>

                    )}
                </Marker>

            </GoogleMap>
        </div>
    )
}));




export default MyGoogleMap;

