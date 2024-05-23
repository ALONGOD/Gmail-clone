const { useState, useEffect } = React
const { Link } = ReactRouterDOM

// import { NoteAdd } from '../cmps/NoteAdd.jsx'
// import { NoteAsideToolBar } from '../cmps/NoteAsideToolBar.jsx'
// import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { AddNote } from '../cmps/AddNote.jsx'

// import { NoteHeader } from '../cmps/NoteHeader.jsx'
// import { noteUtilsService } from '../services/note.utils.service.js'
// import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [filterBy, setFilterBy] = useState({
        search: ''
    })


    useEffect(() => {
        setIsLoading(true)
        noteService.query(filterBy)
            .then(notesRes => setNotes(notesRes))
            .finally(() => {
                setIsLoading(false)
            })

    }, [])



    function removeNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                // showSuccessMsg(`Car (${noteId}) removed successfully!`)
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('There was a problem')
            })
    }

    function onSetFilterBy(newFilter) {
        setFilterBy({ ...newFilter })
    }

    function onAddNote(newNote) {
        setNotes(prevNotes => [...prevNotes, newNote])
    }


    // console.log(notes)
    if (isLoading) return <h3>Loading...</h3>


    return <React.Fragment>
        <div className="header">
            <div className="sidebar-header">
                <img
                    className="sidebar-menu-btn"
                    src="assets/img/menu-btn.svg"
                    onClick={() => setToggleMenu(state => !state)}
                />
                <img
                    className="header-icon"
                    src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-keep-icon.png"
                />
            </div>

            <div className="search-bar">
                <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            </div>
        </div>
        <div className='note-grid'>
            <aside>sidebar</aside>
            <main>
                <AddNote onAddNote={onAddNote} />


                <NoteList notes={notes} onRemove={removeNote} />
            </main>
        </div>
    </React.Fragment>

}
