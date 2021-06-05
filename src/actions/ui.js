import { types } from "../types/types"
import {firebase} from '../firebase/firebase-config'
import { noteLogout } from "./notes"


export const setError = (err) => {
    return{
        type: types.uiSetError,
        payload: err
    }
    
}
export const removeError = () => {
    return {
        type: types.uiRemoveError
    }
}

export const startLoading = () => {
    return {
        type: types.uiStartLoading
    }
}

export const finishLoading = () => {
    return {
        type: types.uiFinishLoading
    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut();
        dispatch(logout())

        dispatch(noteLogout())
    }
}



export const logout = () => {
    return{
        type: types.logout
    }
}