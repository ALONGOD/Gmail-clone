const { useState } = React;
import { noteService } from '../services/note.service.js';

export function AddNote({ onAddNote }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noteText, setNoteText] = useState('');
    const [noteType, setNoteType] = useState('NoteTxt');
    const [noteColor, setNoteColor] = useState('#ADD8E6'); // Default color: lightblue
    const [imageUrl, setImageUrl] = useState(''); // For NoteImg type
    const [todoText, setTodoText] = useState(''); // For NoteTodos type

    function handleSubmit(ev) {
        ev.preventDefault();
        let info;
        if (noteType === 'NoteImg') {
            info = { url: imageUrl };
        } else if (noteType === 'NoteTodos') {
            const todos = todoText.split(',').map(todo => ({ txt: todo.trim(), doneAt: null }));
            info = { title: 'Todos', todos };
        } else {
            info = { txt: noteText };
        }
        const newNote = {
            type: noteType,
            info,
            createdAt: Date.now(),
            style: {
                backgroundColor: noteColor
            },
            isPinned: false
        };
        noteService.save(newNote).then(savedNote => {
            onAddNote && onAddNote(savedNote);
            setNoteText('');
            setNoteType('NoteTxt');
            setNoteColor('#ADD8E6'); // Reset to default color
            setIsModalOpen(false);
        });
    }

    const renderFormInputs = () => {
        switch (noteType) {
            case 'NoteImg':
                return (
                    <label>
                        Image URL:
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                        />
                    </label>
                );
            case 'NoteTodos':
                return (
                    <label>
                        Todos (comma separated):
                        <input
                            type="text"
                            value={todoText}
                            onChange={(e) => setTodoText(e.target.value)}
                            required
                        />
                    </label>
                );
            default:
                return (
                    <label>
                        Note Text:
                        <input
                            type="text"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            required
                        />
                    </label>
                );
        }
    };

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Add Note</button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <h2>Add a new Note</h2>
                        <form onSubmit={handleSubmit}>
                            {renderFormInputs()}
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
                            <label>
                                Note Color:
                                <input
                                    type="color"
                                    value={noteColor}
                                    onChange={(e) => setNoteColor(e.target.value)}
                                />
                            </label>
                            <button type="submit">Save Note</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
