
export function NoteVideo({ note }) {
    // return <div>hi video</div>
    const embedUrl = note.info && note.info.url; // Check if embedUrl exists

    return (
        <div className="note-video-container">
            <h2 className="note-video-title">{note.info.title}</h2>
            {embedUrl && (
                <iframe
                    className="note-video-iframe"
                    width="200"
                    height="150"
                    src={note.info.url}
                    title={note.info.title}
                    allowFullScreen
                ></iframe>
            )}
        </div>
    );
}