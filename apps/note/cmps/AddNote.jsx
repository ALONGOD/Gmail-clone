const { useState, useEffect } = React
import { noteService } from '../services/note.service.js'

export function AddNote({ onAddNote }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    const [noteType, setNoteType] = useState('NoteTxt')

    function handleSubmit(ev) {
        ev.preventDefault()
        const newNote = {
            type: noteType,
            info: { txt: noteText },
            createdAt: Date.now(),
            style: {
                backgroundColor: 'lightblue'
            },
            isPinned: false
        }
        noteService.save(newNote).then(savedNote => {
            onAddNote && onAddNote(savedNote)
            setNoteText('')
            setNoteType('NoteTxt')
            setIsModalOpen(false)
        })
    }

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Add Note</button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <h2>Add a new Note</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Note Text:
                                <input
                                    type="text"
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Note Type:
                                <select
                                    value={noteType}
                                    onChange={(e) => setNoteType(e.target.value)}
                                >
                                    <option value="NoteTxt">Text</option>
                                    <option value="NoteImg">Image</option>
                                    <option value="NoteTodos">Todos</option>
                                </select>
                            </label>
                            <button type="submit">Save Note</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}