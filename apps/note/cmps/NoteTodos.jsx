import { utilService } from "../../../services/util.service";

const { useState, useEffect } = React;

export function NoteTodos({ note }) {
    const [todos, setTodos] = useState(note.info.todos);

    const handleTodoClick = (clickedTodo) => {
        const updatedTodos = todos.map(todo =>
            todo === clickedTodo ? { ...todo, doneAt: todo.doneAt ? null : Date.now(), todoId: utilService.makeId(4) } : todo
        );
        setTodos(updatedTodos);
    };

    const isDoneClass = (todo) => {
        return todo.doneAt ? 'note-done' : '';
    };

    return (
        <article className="note-preview-todo">
            <h2>{note.info.title}</h2>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.todoId}>
                        <span
                            onClick={() => handleTodoClick(todo)}
                            className={isDoneClass(todo)}
                        >
                            {todo.txt}
                        </span>
                    </li>
                ))}
            </ul>
        </article>
    );
}
