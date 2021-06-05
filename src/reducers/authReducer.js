import { types } from "../types/types";


/*
El state estara vacio mientras no este autenticado, cuando estemos
autenticado se tendra un 
{
    uid: 'ddsdsdsd'
    name: 'JACUIER'
}
*/

// los reducer reciben sie,pre dos cosas un state y un action
export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case types.login:
            return{
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        
        case types.logout:
            return { }
    
        default:
            return state;
    }
}