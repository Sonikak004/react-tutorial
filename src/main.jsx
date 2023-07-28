import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/todoList';
import './styles/app.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoList />
  </React.StrictMode>
);
