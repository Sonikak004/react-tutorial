import { useState, useEffect, useCallback } from 'react';
import '../styles/todolist.css';

const TodoList = () => {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [editingTodoId, setEditingTodoId] = useState(null);

    const loadTodos = useCallback(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
        setLoaded(true);
    }, []);

    const saveTodos = useCallback(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        loadTodos();
    }, [loadTodos]);

    useEffect(() => {
        saveTodos();
    }, [todos, saveTodos]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() === '') return;
        setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
        setInputValue('');
    };

    const handleDeleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleStartEdit = (id) => {
        setEditingTodoId(id);
    };

    const handleEditTodo = (event, id) => {
        const newText = event.target.value;
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, text: newText } : todo
        );
        setTodos(updatedTodos);
    };

    const handleToggleComplete = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const handleBlur = () => {
        setEditingTodoId(null);
    };

    if (!loaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className='wrapper'>
            <h1>To do List</h1>
            <div className='input-listwrap'>
                <div>
                    <input className='listinput' type="text" value={inputValue} onChange={handleInputChange} />
                    <button className='grebut' onClick={handleAddTodo}>Add</button>
                </div>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleComplete(todo.id)}
                            />
                            {editingTodoId === todo.id ? (
                                <input
                                    type="text"
                                    value={todo.text}
                                    onChange={(e) => handleEditTodo(e, todo.id)}
                                    onBlur={handleBlur}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleBlur();
                                        }
                                    }}
                                />
                            ) : (
                                <span
                                    style={{
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                    }}
                                    onDoubleClick={() => handleStartEdit(todo.id)}
                                >
                                    {todo.text}
                                </span>
                            )}
                            <button className='redbut' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;
