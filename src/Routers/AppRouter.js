import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    // Route,
    Redirect,
    
  } from "react-router-dom";

import {firebase} from '../firebase/firebase-config'
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';

import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
// import { LoginScreen } from '../components/auth/LoginScreen';
import { PrivateRoute } from './PrivateRoute';

import {startLoadingNotes } from '../actions/notes';
  
export const AppRouter = () => {

    const dispatch = useDispatch()

    const [checking, setchecking] = useState(true);
    const [isLoggedIn, setisLoggedIn] = useState(false)

    useEffect(() => {
        
        // nos da un observable (se actualzza cada momento)
        // si no estas auterticado te regresa un null
        firebase.auth().onAuthStateChanged( async (user) => {
            // console.log(user);
            // si el user existe, entonces pregubnta si existe el uid
            if(user?.uid){
                dispatch(login(user.uid, user.displayName)) 
                setisLoggedIn(true)

                dispatch(startLoadingNotes(user.uid));
            }else {
                setisLoggedIn(false)
            }
            setchecking(false)

        })
       
    }, [dispatch, setchecking, setisLoggedIn])

    if(checking){
        return (
            <h1>Espere...</h1>
        )
    
    }

    return (
        <Router>
            <div>
                <Switch>
                    {/* <Route 
                        path="/auth" 
                        component={AuthRouter} 
                    />
                    
                    <Route 
                        exact 
                        path="/" 
                        component={JournalScreen} 
                    />
                    
                    <Redirect to="/auth/login"/> */}

                    <PublicRoute
                        path="/auth"
                        component = {AuthRouter}
                        isAuthenticated = {isLoggedIn}
                    >

                    </PublicRoute>

                    <PrivateRoute
                        exact path = "/"
                        component = {JournalScreen}
                        isAuthenticated = { isLoggedIn}
                    >
                    </PrivateRoute>
                    
                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
