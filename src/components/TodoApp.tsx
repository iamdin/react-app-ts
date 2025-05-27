import { useState, useEffect } from 'react';
import { Todo, FilterType } from '../types/todo';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';
import { TodoFilter } from './TodoFilter';

const STORAGE_KEY = 'react-todos';

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Failed to load todos from localStorage:', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    setTodos(prev =>
      prev.map(todo => ({ ...todo, completed: !allCompleted }))
    );
  };

  const todoCount = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  };

  return (
    <div className="todo-app">
      <header className="todo-header">
        <h1>Todo App</h1>
        <p>A simple and elegant todo application built with React & TypeScript</p>
      </header>

      <main className="todo-main">
        <TodoInput onAdd={addTodo} />
        
        {todos.length > 0 && (
          <>
            <div className="todo-controls">
              <button
                onClick={toggleAll}
                className="toggle-all-btn"
                title={todos.every(todo => todo.completed) ? 'Mark all as active' : 'Mark all as completed'}
              >
                {todos.every(todo => todo.completed) ? '↶' : '✓'} Toggle All
              </button>
              
              {todoCount.completed > 0 && (
                <button
                  onClick={clearCompleted}
                  className="clear-completed-btn"
                >
                  Clear Completed ({todoCount.completed})
                </button>
              )}
            </div>

            <TodoFilter
              currentFilter={filter}
              onFilterChange={setFilter}
              todoCount={todoCount}
            />

            <TodoList
              todos={todos}
              filter={filter}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          </>
        )}
      </main>
    </div>
  );
};