import React from 'react'
import moment from 'moment'
// import 'moment/locale/es'
import { activeNote } from '../../actions/notes'
import { useDispatch } from 'react-redux'

export const JournalEntry = ({id, date, title, body, url}) => {

    // moment.locale('es')

    const noteDate = moment(date);
    // console.log(noteDate);

    const dispatch = useDispatch()

    const handleEntryClick = () => {
        dispatch(activeNote(id, {
            date, title, body, url
        }))
    }

    return (
        <div 
            className="journal__entry pointer"
            onClick={handleEntryClick}
        >
            {
                url &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                >

                </div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
                {/* <span>Leer mas</span> */}

            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('DD')}</h4>
            </div>
        </div>
    )
}
