const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
import { noteService } from "../services/note.service.js"

const { Link } = ReactRouterDOM

export function NoteEdit() {
    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedText, setEditedText] = useState('');
    const [editedTodos, setEditedTodos] = useState([]);
    const [editedImageUrl, setEditedImageUrl] = useState('');
    const [editedNoteType, setEditedNoteType] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        noteService.get(params.noteId)
            .then(note => {
                console.log(note);
                setNote(note);
                setEditedTitle(note.info.title || ''); // Initialize edited fields with note data
                setEditedText(note.info.text || '');
                setEditedTodos(note.info.todos || []);
                setEditedImageUrl(note.info.url || '');
                setEditedNoteType(note.type);
            })
            .catch(() => {
                alert('Couldnt get note...');
                navigate('/note');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [params.noteId, navigate]);

    const handleSave = () => {
        // Construct updated note object
        const updatedNote = {
            ...note,
            info: {
                title: editedTitle,
                text: editedText,
                todos: editedTodos,
                url: editedImageUrl
            },
            type: editedNoteType
        };

        // Save the updated note (assuming you have a saveNote function in your note service)
        noteService.save(updatedNote)
            .then(() => {
                alert('Note saved successfully!');
            })
            .catch(error => {
                console.error('Error saving note:', error);
                alert('Failed to save note. Please try again.');
            })
            .finally(() => {
                navigate('/note'); // Navigate back to '/note' regardless of success or failure
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
                            <label>Title:</label>
                            <input type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} />
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
                                        <input type="checkbox" checked={todo.completed} onChange={() => handleTodoCompletionChange(index)} />
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
                            <input type="text" value={editedImageUrl} onChange={e => setEditedImageUrl(e.target.value)} />
                        </div>
                    )}
                    <button onClick={handleSave}>Save</button>
                </div>
            )}
        </div>
    );
}