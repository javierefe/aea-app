import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'


import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const {active:note} = useSelector(state => state.notes)
    
    const [formValues, handleInputChange, reset] = useForm(note);

    const {body, title, id} = formValues;

    // me permite alamcenar una variable mutable que no renderizara
    // todo el componente si cambia
    const activeId = useRef(note.id)

    useEffect(() => {
        if (note.id !== activeId.current){
            reset(note)
            activeId.current = note.id
        }
    }, [note, reset])

    useEffect(() => {
        dispatch(activeNote(formValues.id, {...formValues}))
    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch(startDeleting(id))
    }

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />
            <div className="notes_content">
                <input
                    type="text"
                    placeholder="Algun titulo interesante?"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                    
                    
                />

                <textarea
                    placeholder="Que paso hoy?"
                    className="notes_textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                >

                </textarea>

                {
                    (note.url)
                    &&
                    (
                        <div className="notes__image">
                            <img 
                                src={note.url}
                                alt="imagen"
                            />
                        </div>
                    )
                }
            </div>

            <div 
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Eliminar Entrada
            </div>

        </div>
    )
}
