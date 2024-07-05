import React, { useState } from 'react';
import { useTodos } from '../../context/Todo';
import './Modal.css'

interface ModalProps {
    date: string;
    onClose: (event: React.MouseEvent) => void;
}

const Modal: React.FC<ModalProps> = ({ date, onClose }) => {
    const { todos, addTodo, removeTodo, toggleTodo } = useTodos();
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            addTodo(date, newTodo);
            setNewTodo('');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="modal-closeBtn" onClick={onClose}>
                    &times;
                </span>
                <h2>To-Do на {date}</h2>
                <input
                    className='modal-input'
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button className='modal-addBtn' onClick={handleAddTodo}>Добавить</button>
                <ul className='modal-list-container'>
                    {todos[date]?.map((todo) => (
                        <li key={todo.id} className={todo.completed ? 'modal-list-component completed' : 'modal-list-component'}>
                            <span className='modal-list-text' onClick={() => toggleTodo(date, todo.id)}>{todo.text}</span>
                            <button className='modal-list-deleteBtn' onClick={() => removeTodo(date, todo.id)}>Удалить</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Modal;
