import { utilService } from "../../../services/util.service";

const { useState, useEffect } = React

export function AddNote({ onAddNote }) {
    const [noteText, setNoteText] = useState('');
    const [noteTextTitle, setNoteTextTitle] = useState('');
    const [noteType, setNoteType] = useState('');
    const [noteColor, setNoteColor] = useState('#ADD8E6'); // Default color: lightblue
    const [imageUrl, setImageUrl] = useState('');
    const [imageTitle, setImageTitle] = useState('');
    const [todoText, setTodoText] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [videoTitle, setVideoTitle] = useState('');





    function handleSubmit(ev) {
        ev.preventDefault();
        let info;
        if (noteType === 'NoteImg') {
            info = { title: imageTitle, url: imageUrl };
        } else if (noteType === 'NoteTodos') {
            const todos = todoText.split(',').map(todo => ({ txt: todo.trim(), doneAt: null }));
            info = { title: noteText, todos };
        } else if (noteType === 'NoteVideo') {
            info = { title: videoTitle, url: videoUrl };
        } else {
            info = { title: noteTextTitle, txt: noteText };
        }
        const newNote = {
            type: noteType,
            info,
            createdAt: Date.now(),
            style: {
                backgroundColor: '#f8e5c5'
            },
            isPinned: false
        };
        onAddNote && onAddNote(newNote);
        setNoteText('');
        setNoteType('');
        setNoteColor('#f8e5c5'); // Reset to default color
        setImageUrl('');
        setImageTitle('');
        setTodoText('');
        setVideoUrl('');
        setVideoTitle('');
        setNoteTextTitle('');

    }

    const renderFormInputs = () => {
        switch (noteType) {
            case 'NoteImg':
                return (
                    <div className="note-inputs-container">
                        <label className="note-input-label">
                            <input
                                type="text"
                                placeholder="Title..."

                                value={imageTitle}
                                onChange={(e) => setImageTitle(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                        <label className="note-input-label">
                            <input
                                placeholder="URL..."

                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                    </div>
                );
            case 'NoteTodos':
                return (
                    <div className="note-inputs-container">
                        <label className="note-input-label">
                            <input
                                placeholder="Title..."

                                type="text"
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                        <label className="note-input-label">
                            <input
                                placeholder="Todos..."

                                type="text"
                                value={todoText}
                                onChange={(e) => setTodoText(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                    </div>
                );
            case 'NoteVideo':
                return (
                    <div className="note-inputs-container">
                        <label className="note-input-label">
                            <input
                                placeholder="Title..."

                                type="text"
                                value={videoTitle}
                                onChange={(e) => setVideoTitle(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                        <label className="note-input-label">
                            <input
                                placeholder="URL..."

                                type="text"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                    </div>
                );
            case 'NoteTxt':
                return (
                    <div className="note-inputs-container">
                        <label className="note-input-label">
                            <input
                                placeholder="Title..."

                                type="text"
                                value={noteTextTitle}
                                onChange={(e) => setNoteTextTitle(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                        <label className="note-input-label">
                            <input
                                placeholder="Text..."

                                type="text"
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                    </div>
                );
            default:
                return (
                    <label className="note-input-label">
                        <input
                            placeholder="What's on your mind?..."
                            type="text"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            required
                            className="note-input"
                            onClick={() => setNoteType("NoteTxt")}
                        />
                    </label>
                );
        }
    };

    return (
        <div className="note-container">
            <form className="note-form" onSubmit={handleSubmit}>
                {renderFormInputs()}
                {/* <label className="note-input-label">
                    <input
                        type="color"
                        value={noteColor}
                        onChange={(e) => setNoteColor(e.target.value)}
                        className="note-input-color"
                    />
                </label> */}
                <button type="submit" className="note-submit-button">Add Note</button>
            </form>
            <div className="note-type-icons">
                <i className="fas fa-font note-type-icon" onClick={() => setNoteType('NoteTxt')}></i>
                <i className="far fa-list-alt note-type-icon" onClick={() => setNoteType('NoteTodos')}></i>
                <i className="far fa-image note-type-icon" onClick={() => setNoteType('NoteImg')}></i>
                <i className="far fa-play-circle note-type-icon" onClick={() => setNoteType('NoteVideo')}></i>
            </div>
        </div>
    );
}
