export function NoteTodos({ note }) {
    return (
        <article className="note-preview">
            <ul>
                {note.info.todos.map((todo) => (
                    <li key={todo.doneAt}>
                        <span
                            onClick={() => handleTodoClick(todo)}
                        // className={isDoneClass(todo)}
                        >
                            {todo.txt}
                        </span>
                    </li>
                ))}
            </ul>
        </article>
    )

}