import React from 'react'
// import {firebase} from '../../firebase/firebase-config';
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/ui'
import { JournalEntries } from './JournalEntries'
import { startNewNote } from '../../actions/notes';

export const Sidebar = () => {

    const dispatch = useDispatch()
    const {name} = useSelector(state => state.auth)
    // console.log(state);

    // const {displayName, email} = firebase.auth().currentUser;
    // const {name} = firebase.auth().currentUser;
    

    const handleLogout = () => {
        dispatch(startLogout())
    }

    const handleAddNew = () => {
        dispatch(startNewNote());
    }

    return (
        <aside className="journal__sidebar">
            
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-user ml-5 mr-1"></i>
                    {/* <span> {displayName}</span> <br />
                    <span>{email}</span> */}
                    <span>{ name }</span>
                </h3>

                <button 
                    className="btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            <div 
                className="journal__new-entry"
                onClick={handleAddNew}
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    Nueva Entrada
                </p>
            </div>

            <JournalEntries />
        </aside>
    )
}
