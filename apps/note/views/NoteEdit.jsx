const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'


const { Link } = ReactRouterDOM

export function NoteEdit() {
    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedText, setEditedText] = useState('');
    const [editedTodos, setEditedTodos] = useState([]);
    const [editedMediaUrl, setEditedMediaUrl] = useState('');
    const [editedNoteType, setEditedNoteType] = useState('');

    const [editedLat, setEditedLat] = useState(0);
    const [editedLng, setEditedLng] = useState(0);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        noteService.get(params.noteId)
            .then(note => {
                setNote(note);
                setEditedTitle(note.info.title || '');
                setEditedText(note.info.txt || '');
                setEditedTodos(note.info.todos || []);
                setEditedMediaUrl(note.info.url || '');
                setEditedNoteType(note.type);

                // Set map note coordinates if available
                if (note.info.coords) {
                    setEditedLat(note.info.coords.lat || 0);
                    setEditedLng(note.info.coords.lng || 0);
                }
            })
            .catch(() => {
                alert('Couldn\'t get note...');
                navigate('/note');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [params.noteId, navigate]);

    const handleSave = () => {
        const updatedNote = {
            ...note,
            info: {
                title: editedTitle,
                txt: editedText,
                todos: editedTodos,
                url: editedMediaUrl,
                coords: { lat: editedLat, lng: editedLng } // Update map coordinates
            },
            type: editedNoteType
        };

        noteService.save(updatedNote)
            .then(() => {
                showSuccessMsg('Note edited successfully!');
            })
            .catch(error => {
                console.error('Error saving note:', error);
                showErrorMsg('Couldn\'t edit note...');
            })
            .finally(() => {
                navigate('/note');
            });
    };

    if (isLoading) return <h3 className="note-loading">Loading...</h3>;

    return (
        <div className="note-container">
            <h1 className="note-heading">Note Edit</h1>
            {note && (
                <div className="note-details">
                    {editedNoteType === 'NoteTxt' && (
                        <div className="note-text">
                            <label className="note-label">Text:</label>
                            <textarea className="note-textarea" value={editedText} onChange={e => setEditedText(e.target.value)} />
                        </div>
                    )}
                    {editedNoteType === 'NoteTodos' && (
                        <div className="note-todos">
                            <label className="note-label">Title:</label>
                            <input className="note-input" type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} />
                            <ul className="note-todo-list">
                                {editedTodos.map((todo, index) => (
                                    <li className="note-todo-item" key={index}>
                                        <input className="note-todo-input" type="text" value={todo.txt} onChange={e => handleTodoTextChange(index, e.target.value)} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {editedNoteType === 'NoteImg' && (
                        <div className="note-image">
                            <label className="note-label">Title:</label>
                            <input className="note-input" type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} />
                            <label className="note-label">Image URL:</label>
                            <input className="note-input" type="text" value={editedMediaUrl} onChange={e => setEditedMediaUrl(e.target.value)} />
                        </div>
                    )}
                    {editedNoteType === 'NoteVideo' && (
                        <div className="note-video">
                            <label className="note-label">Title:</label>
                            <input className="note-input" type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} />
                            <label className="note-label">Video URL:</label>
                            <input className="note-input" type="text" value={editedMediaUrl} onChange={e => setEditedMediaUrl(e.target.value)} />
                        </div>
                    )}
                    {editedNoteType === 'NoteMap' && (
                        <div className="note-map">
                            <label className="note-label">Title:</label>
                            <input className="note-input" type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} />
                            <label className="note-label">Latitude:</label>
                            <input className="note-input" type="number" value={editedLat} onChange={e => setEditedLat(parseFloat(e.target.value))} />
                            <label className="note-label">Longitude:</label>
                            <input className="note-input" type="number" value={editedLng} onChange={e => setEditedLng(parseFloat(e.target.value))} />
                        </div>
                    )}
                    <button className="note-save-button" onClick={handleSave}>Save</button>
                </div>
            )}
        </div>
    );
}
