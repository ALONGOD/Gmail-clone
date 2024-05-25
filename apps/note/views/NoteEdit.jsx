const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
import { noteService } from "../services/note.service.js"

const { Link } = ReactRouterDOM

export function NoteEdit() {
    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    const { noteId } = useParams();

    useEffect(() => {
        setIsLoading(true);
        noteService.get(params.noteId)
            .then(note => {
                console.log(note);
                setNote(note);
            })
            .catch(() => {
                alert('Couldnt get note...');
                navigate('/note');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [params.noteId]);

    if (isLoading) return <h3>Loading...</h3>;

    function renderEditOptions() {
        console.log("Note type:", note.type); // Log the note type
        if (!note) {
            console.log("Note is null");
            return null;
        }

        // Determine the type of note
        switch (note.type) {
            case 'NoteTxt':
                console.log("Rendering text edit options");
                return (
                    <div>
                        <label>Text:</label>
                        <textarea value={note.info.text}></textarea>
                    </div>
                );
            case 'NoteTodos':
                console.log("Rendering todos edit options");
                return (
                    <div>
                        <label>Title:</label>
                        <input type="text" value={note.info.title} />
                        <ul>
                            {note.info.todos.map(todo => (
                                <li key={todo.txt}>
                                    <input type="checkbox" checked={todo.completed} />
                                    {todo.txt}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'NoteImg':
                console.log("Rendering photo edit options");
                return (
                    <div>
                        <label>Title:</label>
                        <input type="text" value={note.info.title} />
                        <label>Image URL:</label>
                        <input type="text" value={note.info.url} />
                    </div>
                );
            default:
                console.log("Unknown note type:", note.type);
                return null;
        }
    }

    return (
        <div>
            <h1>Note Details</h1>
            <p>Note ID: {noteId}</p>
            {renderEditOptions()}
        </div>
    );
}
