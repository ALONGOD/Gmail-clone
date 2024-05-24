const { useState } = React;

export function AddNote({ onAddNote }) {
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
        onAddNote && onAddNote(newNote);
        setNoteText('');
        setNoteType('NoteTxt');
        setNoteColor('#ADD8E6'); // Reset to default color
        setImageUrl(''); // Reset imageUrl
        setTodoText(''); // Reset todoText
    }

    const renderFormInputs = () => {
        switch (noteType) {
            case 'NoteImg':
                return (
                    <label className="note-input-label">
                        Image URL:
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                            className="note-input"
                        />
                    </label>
                );
            case 'NoteTodos':
                return (
                    <label className="note-input-label">
                        Todos (comma separated):
                        <input
                            type="text"
                            value={todoText}
                            onChange={(e) => setTodoText(e.target.value)}
                            required
                            className="note-input"
                        />
                    </label>
                );
            default:
                return (
                    <label className="note-input-label">
                        Note Text:
                        <input
                            type="text"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            required
                            className="note-input"
                        />
                    </label>
                );
        }
    };

    return (
        <div className="note-container">
            <div className="note-type-icons">
                <i className="fas fa-font note-type-icon" onClick={() => setNoteType('NoteTxt')}></i>
                <i className="far fa-image note-type-icon" onClick={() => setNoteType('NoteImg')}></i>
                <i className="far fa-list-alt note-type-icon" onClick={() => setNoteType('NoteTodos')}></i>
            </div>
            <form className="note-form" onSubmit={handleSubmit}>
                {renderFormInputs()}
                <label className="note-input-label">
                    Note Color:
                    <input
                        type="color"
                        value={noteColor}
                        onChange={(e) => setNoteColor(e.target.value)}
                        className="note-input-color"
                    />
                </label>
                <button type="submit" className="note-submit-button">Save Note</button>
            </form>
        </div>
    );
}
