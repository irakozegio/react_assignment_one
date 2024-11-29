import React, { useState, useEffect, useContext, createContext, useCallback } from 'react';
import PropTypes from 'prop-types';

// Task context
const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from an API or Data Store
    const fetchedTasks = [
      { id: 1, title: 'First Task', completed: false },
      { id: 2, title: 'Second Task', completed: true },
    ];
    setTasks(fetchedTasks);
  }, []);

  const addTask = useCallback((task) => setTasks((prevTasks) => [...prevTasks, task]), []);

  return (
    <TaskContext.Provider value={{ tasks, addTask }} key="task-provider">
      {children}
    </TaskContext.Provider>
  );
};

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <div style={styles.container}>
      <h1>Irakoze Anne Giovanie : l5sod work</h1>
      <h3 style={styles.title}>Task List</h3>
      <ul style={styles.list}>
        {tasks.map(task => (
          <li key={task.id} style={styles.listItem}>
            {task.title} {task.completed ? '(Completed)' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AddTask = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { addTask } = useContext(TaskContext);

  const handleAdd = () => {
    if (newTaskTitle.trim()) {
      addTask({ id: Date.now(), title: newTaskTitle, completed: false });
      setNewTaskTitle('');
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Add New Task</h3>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleAdd} style={styles.button}>Add Task</button>
    </div>
  );
};

const App = () => {
  return (
    <TaskProvider>
      <TaskList />
      <AddTask />
    </TaskProvider>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f0f0',
    padding: '20px',
    margin: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#6200ea',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '10px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#3700b3',
  },
  input: {
    padding: '10px',
    width: 'calc(100% - 22px)',
    marginTop: '10px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    backgroundColor: 'white',
    margin: '5px 0',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
};

export default App;
