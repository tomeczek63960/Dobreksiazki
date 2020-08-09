export const emailValidation = ( email ) =>{
    if( email === "" ) return { valid: false, msg: "Wymagane pole" };

    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validate = regex.test( email );

    return validate ? { valid: true } : { valid: false , msg: "Niepoprawny E-mail" };
}

export const passwordValidation = ( password ) =>{
    if( password === '' ) return { valid: false, msg: 'Wymagene pole' };

    const validate = password.length > 4;   
    return validate ? { valid: true } : { valid: false, msg: "Hasło musi zawierać conajmniej 5 znaków" };
}

export const passwordConfirmValidation = ( password, passwordConfirm ) =>{
   if( !passwordConfirm.length ) return { valid: false, msg: "Wymagene pole" };
    const validate = password === passwordConfirm;
    
    return validate ? { valid: true } : { valid: false, msg: "Hasła nie są zgodne" };
}