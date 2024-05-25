const { useState, useEffect } = React
const { Link } = ReactRouterDOM

// import { NoteAdd } from '../cmps/NoteAdd.jsx'
// import { NoteAsideToolBar } from '../cmps/NoteAsideToolBar.jsx'
// import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { AddNote } from '../cmps/AddNote.jsx'
import { NotesSidebar } from '../cmps/NotesSidebar.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'

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
        loadNotes();
    }, [filterBy]);

    function loadNotes() {
        noteService.query(filterBy).then(notesRes => {
            setNotes(sortNotes(notesRes));
        });
    }

    function sortNotes(notes) {
        return notes.sort((a, b) => b.isPinned - a.isPinned);
    }
    function onPin(noteId) {
        noteService.togglePin(noteId).then(() => {
            loadNotes();
        }).catch(err => {
            console.log('err:', err);
        });
    }

    function onDuplicate(noteId) {
        noteService.duplicate(noteId)
            .then(duplicatedNote => {
                console.log(duplicatedNote)
                // duplicatedNote.isDuplicated = false
                setNotes(prevNotes => sortNotes([...prevNotes, duplicatedNote]));
            }).catch(err => {
                console.log('err:', err);
            });
    }


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
        noteService.save(newNote).then(savedNote => {
            setNotes(prevNotes => [...prevNotes, savedNote]);
        });
    }

    function onChangeColor(noteId, color) {
        noteService.get(noteId).then(note => {
            note.style = { ...note.style, backgroundColor: color };
            noteService.save(note).then(updatedNote => {
                // Update the local state or re-fetch the notes as necessary
                // For example, if using a state hook:
                setNotes(prevNotes => prevNotes.map(n => n.id === updatedNote.id ? updatedNote : n));
            });
        });
    }


    // console.log(notes)
    // if (isLoading) return <h3>Loading...</h3>


    return <React.Fragment>
        <NoteHeader filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        <div className='note-grid'>
            <aside><NotesSidebar /></aside>
            <main>
                <AddNote onAddNote={onAddNote} />


                <NoteList notes={notes} onRemove={removeNote} onPin={onPin} onDuplicate={onDuplicate} onChangeColor={onChangeColor} />
            </main>
        </div>
    </React.Fragment>

}
