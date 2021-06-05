import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNotes, startUploading } from '../../actions/notes'
import moment from 'moment'


export const NotesAppBar = () => {

    const date = new Date ();
    const appDate = moment(date);

    const dispatch = useDispatch()
    const {active} = useSelector(state => state.notes)
    // console.log(active);
    
    const handleSave = () => {
        dispatch(startSaveNotes(active))
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if(file) {
            dispatch(startUploading(file))
        }
    }

    return (
        <div className="notes__appbar">
            <span>¡Hola! {appDate.format('[Today is] dddd D MMM [del] YYYY')}</span>
 
            <input 
                id="fileSelector"
                type="file" 
                name="file"
                style={{display: 'none'}}
                onChange={handleFileChange}
            />

            <div>
                <button 
                    className="btn btn-picture"
                    onClick={handlePictureClick}
                >
                    Picture
                </button>
                <button 
                    className="btn"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
