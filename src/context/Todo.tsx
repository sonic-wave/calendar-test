import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoContextType {
    todos: Record<string, Todo[]>;
    addTodo: (date: string, text: string) => void;
    removeTodo: (date: string, id: number) => void;
    toggleTodo: (date: string, id: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [todos, setTodos] = useState<Record<string, Todo[]>>({});

    const addTodo = (date: string, text: string) => {
        const newTodo = { id: Date.now(), text, completed: false };
        setTodos((prevTodos) => ({
            ...prevTodos,
            [date]: [...(prevTodos[date] || []), newTodo],
        }));
    };

    const removeTodo = (date: string, id: number) => {
        setTodos((prevTodos) => ({
            ...prevTodos,
            [date]: prevTodos[date].filter((todo) => todo.id !== id),
        }));
    };

    const toggleTodo = (date: string, id: number) => {
        setTodos((prevTodos) => ({
            ...prevTodos,
            [date]: prevTodos[date].map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
        }));
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, removeTodo, toggleTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

const useTodos = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('Используйте useTodos с TodoProvider');
    }
    return context;
};

export { TodoProvider, useTodos };
