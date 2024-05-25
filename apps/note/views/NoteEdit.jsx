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
    const [editedMediaUrl, setEditedMediaUrl] = useState(''); // Renamed from editedImageUrl
    const [editedNoteType, setEditedNoteType] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        noteService.get(params.noteId)
            .then(note => {
                console.log(note);
                setNote(note);
                setEditedTitle(note.info.title || '');
                setEditedText(note.info.txt || '');
                setEditedTodos(note.info.todos || []);
                setEditedMediaUrl(note.info.url || ''); // Updated to set video URL
                setEditedNoteType(note.type);
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
                url: editedMediaUrl // Updated to set video URL
            },
            type: editedNoteType
        };

        noteService.save(updatedNote)
            .then(() => {
                showSuccessMsg('Successfully edited note!');
            })
            .catch(error => {
                console.error('Error saving note:', error);
                showErrorMsg('Couldn\'t edit note...');
            })
            .finally(() => {
                navigate('/note');
            });
    };

    const handleTodoTextChange = (index, newText) => {
        const updatedTodos = [...editedTodos];
        updatedTodos[index].txt = newText;
        setEditedTodos(updatedTodos);
    };

    const handleTodoCompletionChange = (index) => {
        const updatedTodos = [...editedTodos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setEditedTodos(updatedTodos);
    };

    if (isLoading) return <h3>Loading...</h3>;

    return (
        <div>
            <h1>Note Details</h1>
            <p>Note ID: {params.noteId}</p>
            {note && (
                <div>
                    {editedNoteType === 'NoteTxt' && (
                        <div>
                            <label>Text:</label>
                            <textarea value={editedText} onChange={e => setEditedText(e.target.value)} />
                        </div>
                    )}
                    {editedNoteType === 'NoteTodos' && (
                        <div>
                            <label>Title:</label>
                            <input type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} />
                            <ul>
                                {editedTodos.map((todo, index) => (
                                    <li key={index}>
                                        <input type="text" value={todo.txt} onChange={e => handleTodoTextChange(index, e.target.value)} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {editedNoteType === 'NoteImg' && (
                        <div>
                            <label>Title:</label>
                            <input type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} />
                            <label>Image URL:</label>
                            <input type="text" value={editedMediaUrl} onChange={e => setEditedMediaUrl(e.target.value)} /> {/* Renamed from editedImageUrl */}
                        </div>
                    )}
                    {editedNoteType === 'NoteVideo' && (
                        <div>
                            <label>Title:</label>
                            <input type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} />
                            <label>Video URL:</label>
                            <input type="text" value={editedMediaUrl} onChange={e => setEditedMediaUrl(e.target.value)} /> {/* Updated to set video URL */}
                        </div>
                    )}
                    <button onClick={handleSave}>Save</button>
                </div>
            )}
        </div>
    );
}

