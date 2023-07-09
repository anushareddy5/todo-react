import React, { useState, useEffect } from 'react';
import './styles.css';

function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState('');

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        const initialTasks = storedTasks ? JSON.parse(storedTasks) : [];
        setTasks(initialTasks);
    }, []);

    const addTask = () => {
        if (searchInputValue === '') {
            alert('You must write something!');
            return;
        }
        const newTask = {
            name: searchInputValue,
            status: 'active',
        };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveData(updatedTasks);
        setSearchInputValue('');
    };

    const toggleTaskStatus = (taskIndex) => {
        const updatedTasks = tasks.map((task, index) => {
            if (index === taskIndex) {
                return {
                    ...task,
                    status: task.status === 'active' ? 'completed' : 'active',
                };
            }
            return task;
        });
        setTasks(updatedTasks);
        saveData(updatedTasks);
    };

    const deleteTask = (taskIndex) => {
        const updatedTasks = tasks.filter((task, index) => index !== taskIndex);
        setTasks(updatedTasks);
        saveData(updatedTasks);
    };

    const saveData = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };
    return (
        <div>
            <div className="container">
                <h1 className="heading">Todos</h1>
                <div className="box">
                    <h2>JavaScript</h2>
                </div>
                <div className="search-box">
                    <input
                        type="text"
                        id="search-input"
                        className="search-text"
                        placeholder="What Needs To Be Done?"
                        value={searchInputValue}
                        onChange={(e) => setSearchInputValue(e.target.value)}
                    />
                    <button className="search-button" onClick={addTask}>
                        Add
                    </button>
                </div>
                <ul id="list-container">
                    {tasks.map((task, index) => (
                        <li
                            key={index}
                            className={task.status === 'completed' ? 'checked' : ''}
                            onClick={() => toggleTaskStatus(index)}
                        >
                            {task.name}
                            <span className="close-icon" onClick={() => deleteTask(index)}>
                                &times;
                            </span>
                        </li>
                    ))}
                </ul>
                <p className="message">Double-click to edit a todo</p>
            </div>
        </div>
    );
}

export default TodoApp;
