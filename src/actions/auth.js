import Swal from 'sweetalert2'

import { types } from "../types/types"
import {firebase, googleAuthProvider} from '../firebase/firebase-config'
import { finishLoading, startLoading } from './ui'

// accion assincrona, regresa un callback
// cuando el middleware reciebe una accion que retorna un callback(otra accion) la va a ejecutar
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user}) => {
                console.log(user);
                dispatch(login( user.uid, user.displayName ));

                dispatch(finishLoading());
            })
            .catch(e => {
                console.log(e);
                dispatch(finishLoading());
                if(e.code === "auth/user-not-found"){
                    Swal.fire('Error', 'No hay ningún registro de usuario que corresponda a este identificador. Es posible que se haya eliminado al usuario. ', 'error');
                }
                
            })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    // console.log(name);
    // es el thunk quien me habilita poder trabajar con el dispatch
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async ({user}) => {
                console.log(user);
                await user.updateProfile({displayName: name});
                
                dispatch(
                    login(user.uid, user.displayName)
                );
            })
            .catch(e => {
                console.log(e);
            })
    }
}

// accion asincrona
export const startGoogleLogin = () => {
    return (dispatch) => {
        // retorna una promesa
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({user}) => {
                dispatch(
                    login(user.uid, user.displayName)
                );
            })
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

// forma corta , entre parentesis

// export const login = (uid, displayName) => ({
    
//         type: types.login,
//         payload: {
//             uid,
//             displayName
//         }
    
// })