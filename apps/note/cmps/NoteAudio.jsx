export function NoteAudio({ note }) {
    // return <div>hii</div>
    // Ensure note and note.info exist
    console.log(note.info.url)
    if (!note || !note.info) {
        return null;
    }

    return (
        <article className="note-audio" style={note.style ? { backgroundColor: note.style.backgroundColor } : {}}>
            {note.info.title && <h2 className="note-title">{note.info.title}</h2>}
            <div className="audio-container">
                <audio controls>
                    <source src={note.info.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        </article>
    );
}

export default NoteAudio;