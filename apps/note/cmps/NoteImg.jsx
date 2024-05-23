export function NoteImg({ note }) {
    return <article>
        <h2>{note.info.title}</h2>
        <img src={note.info.url} alt={note.info.title} />
    </article>
}