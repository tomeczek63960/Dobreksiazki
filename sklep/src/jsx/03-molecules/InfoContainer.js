import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast} from 'react-toastify';

import { fetchHomeProducts } from 'jsx/01-redux/actions/productsAction';
import { fetchBasketProducts } from 'jsx/01-redux/actions/basketActions';

const InfoContainer = () => {

    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    const isProductLoading = useSelector(state => state.productsReducer.loading);
    const isAuthLoading = useSelector(state => state.authReducer.loading);
    const isBasketLoading = useSelector(state => state.basketReducer.loading);

    const authMsg = useSelector(state => state.authReducer.msg);
    const productMsg = useSelector(state => state.productsReducer.msg);
    const basketMsg = useSelector(state => state.basketReducer.msg);


    const toastStyle = {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }

    useEffect(()=>{
        dispatch( fetchHomeProducts() );
    }, [dispatch] );

    useEffect(()=>{
        dispatch( fetchBasketProducts() );   
    },[ token, dispatch ]);

    useEffect(()=>{

        authMsg &&  
        authMsg.description && 
        toast[authMsg.type](`🦄${authMsg.description}`, toastStyle);

    },[authMsg, dispatch, toastStyle]);

    useEffect(()=>{

        productMsg &&  
        productMsg.description && 
        toast[productMsg.type](`🦄${productMsg.description}`, toastStyle);

    },[productMsg, dispatch, toastStyle]);

    useEffect(()=>{
        if( !token ) return;
        basketMsg &&  
        basketMsg.description && 
        toast[basketMsg.type](`🦄${basketMsg.description}`, toastStyle);

    },[basketMsg, dispatch, toastStyle]);

    return ( 
        <>  
           {
                ( isProductLoading.length || isAuthLoading.length || isBasketLoading.length ) ?
                <div className="loader-wrapper">
                    <Loader 
                        type="Circles"
                        // type="Grid"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                </div>
                : ''
            }
            <ToastContainer
                    position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        limit = {3}
                />

        </>
     );
}
 
export default InfoContainer;