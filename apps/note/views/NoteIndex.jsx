const { useState, useEffect } = React
const { Link } = ReactRouterDOM

// import { NoteAdd } from '../cmps/NoteAdd.jsx'
// import { NoteAsideToolBar } from '../cmps/NoteAsideToolBar.jsx'
// import { NoteEdit } from '../cmps/NoteEdit.jsx'
import {
    showSuccessMsg,
    showErrorMsg,
} from '../../../services/event-bus.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { AddNote } from '../cmps/AddNote.jsx'
import { NotesSidebar } from '../cmps/NotesSidebarMenu.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'
const { Outlet, useSearchParams, useParams } = ReactRouterDOM

// import { NoteHeader } from '../cmps/NoteHeader.jsx'
// import { noteUtilsService } from '../services/note.utils.service.js'
// import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
export function NoteIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [notes, setNotes] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [filterBy, setFilterBy] = useState(
        noteService.getFilterFromSearchParams(searchParams)
    )
    const [sidebarHover, setSidebarHover] = useState(false)
    const [toggleSidebar, setToggleSidebar] = useState(false)

    useEffect(() => {
        setSearchParams(filterBy)
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy).then(notesRes => {
            setNotes(sortNotes(notesRes))
            setIsLoading(false)
        })
    }

    function sortNotes(notes) {
        return notes.sort((a, b) => b.isPinned - a.isPinned)
    }
    function onPin(noteId) {
        noteService
            .togglePin(noteId)
            .then(() => {
                loadNotes()
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onDuplicate(noteId) {
        noteService
            .duplicate(noteId)
            .then(duplicatedNote => {
                console.log(duplicatedNote)
                // duplicatedNote.isDuplicated = false
                setNotes(prevNotes => sortNotes([...prevNotes, duplicatedNote]))
                showSuccessMsg('Note duplicated successfully!')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg("Couldn't duplicate note...")
            })
    }

    function onSetFilterBy(newFilter) {
        setFilterBy({ ...newFilter })
    }

    function removeNote(noteId) {
        noteService
            .remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg('Note removed successfully!!')

                // showSuccessMsg(`Car (${noteId}) removed successfully!`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg("Couldn't remove note...")

                // showErrorMsg('There was a problem')
            })
    }

    function onAddNote(newNote) {
        noteService.save(newNote).then(savedNote => {
            setNotes(prevNotes => [...prevNotes, savedNote])
            showSuccessMsg('Note added successfully!')
        })
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

    function onTrash(noteId) {
        console.log('hi trash');

        // Find the note to be trashed and update its isTrash property
        const noteToTrash = notes.find(note => note.id === noteId);
        if (!noteToTrash) {
            console.error('Note not found');
            showErrorMsg("Couldn't find the note to trash...");
            return;
        }

        const updatedNote = { ...noteToTrash, isTrash: true };

        noteService
            .save(updatedNote)
            .then(() => {
                // Re-fetch the notes to update the state
                loadNotes();
                showSuccessMsg('Note moved to trash successfully!');
            })
            .catch(err => {
                console.log('err:', err);
                showErrorMsg("Couldn't move note to trash...");
            });
    }



    // console.log(notes)
    // if (isLoading) return <h3>Loading...</h3>
    if (isLoading) return <h3 className="note-loading">Loading...</h3>;

    const isSidebarOpen = sidebarHover || toggleSidebar

    return <React.Fragment>
        <NoteHeader filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        <div className={`note-grid ${isSidebarOpen ? 'active' : ''}`}>
            <aside>
                <NotesSidebar
                    folder={filterBy.folder}
                    setSidebarHover={setSidebarHover}
                    onSetFilterBy={onSetFilterBy}
                    filterBy={filterBy}
                />
            </aside>
            <main>
                <AddNote onAddNote={onAddNote} />


                <NoteList folder={filterBy.folder} notes={notes} onRemove={removeNote} onPin={onPin} onDuplicate={onDuplicate} onChangeColor={onChangeColor} onTrash={onTrash} />
            </main>
        </div>
    </React.Fragment>
}
