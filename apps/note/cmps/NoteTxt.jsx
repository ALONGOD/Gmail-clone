export function NoteTxt({ note }) {
    return <article>
        <h2>{note.info.title}</h2>
        <p>{(note.info.txt)}</p>
    </article>
}