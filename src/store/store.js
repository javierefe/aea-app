import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';

// soluciona el incoveniente de usar dos middelwares (uno para usar redux devtools
// y otro para usar applyMiddleware)
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


// usar mas de un reducer
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
})

// solo recibe un reducer, por eso debemos hacer la funcion de arriba, cuando se tenga una nueva
// funcionalidad simplente se le agrega a la funcionreducers.
export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);

// para informarle a react que tenemos un store se debe importar en un punto alto de la aplicacion (JournalApp)
