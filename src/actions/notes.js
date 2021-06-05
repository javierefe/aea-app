import Swal from 'sweetalert2'

import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


/**
 {
     notes: [],
     active: null,
     active: {
    1   id: 'dsdsafdfdm3487384dkfn',
        title: '',
        body: '',
        date: 121232321221

     }
 }
 */

// el segundo argumeto de usar parecido al selector
export const startNewNote = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
       
        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote))
    }
}

// si quieres regresar objetos se pone parentesis
export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

const addNewNote = (id, note) => {
   return {
       type: types.notesAddNew,
       payload: {
           id,
           ...note
       }
   } 
}

export const startLoadingNotes = (uid) => {

    return async (dispatch) => {
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

export const setNotes = (notes) => {
    return {
        type: types.notesLoad,
        payload: notes
    }
}

export const startSaveNotes = (note) => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        // console.log(uid);

        if (!note.url){
            delete note.url
        }
        const noteToFirestore = {...note}
        // console.log(noteToFirestore);
        delete noteToFirestore.id

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        dispatch(refreshNote(note.id, noteToFirestore));

        Swal.fire({
            icon: 'success',
            title : 'Guardado con exito',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

export const refreshNote = (id, note) => {
    return {
        type: types.notesUpdated,
        payload:{
           id,
           note: {
               id,
               ...note
           } 
        }
    }
}

export const startUploading = (file) => {
    return async(dispatch, getState) => {
       const {active: activeNote} = getState().notes; 

        Swal.fire({
            title: 'Cargando imagen...',
            text: 'Espere porfa',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        })

       const fileUrl = await fileUpload(file);

       activeNote.url = fileUrl;
      
       dispatch(startSaveNotes(activeNote))

       Swal.close();
    }
}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        

        const uid = getState().auth.uid;

        db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id))

        Swal.fire({
            title: 'Eliminando imagen...',
            text: 'Espere porfa',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
            timer:1500
        })

    }
}

export const deleteNote = (id) => {
    return {
        type: types.notesDelete,
        payload: id
    }
}

export const noteLogout = () => {
    return {
        type: types.notesLogoutCleaning,
        
    }
}
