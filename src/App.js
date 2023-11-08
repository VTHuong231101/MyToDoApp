import './App.css';
import React, { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';

localStorage.getItem('list-task') || localStorage.setItem("list-task", "[]");

function App() {
  //Handle current time
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 3600000);
    return () => clearInterval(intervalId);
  }, []);

  const [darkMode, setDarkMode] = useState(currentHour >= 17 || currentHour <= 5);

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    darkMode ? htmlElement.classList.add('dark') : htmlElement.classList.remove('dark');
  })

  // Handle localStorage

  let listTaslFromLocalStorage = JSON.parse(localStorage.getItem('list-task'));

  const [taskList, setTaskList] = useState(listTaslFromLocalStorage);

  localStorage.setItem('list-task', JSON.stringify(taskList));


  const handleCompleteTask = (id) => {
    const newTaskList = [...taskList];
    console.log(id)

    newTaskList[id] = {
      ...newTaskList[id],
      isCompleted: !newTaskList[id].isCompleted,
      isImportant: newTaskList[id].isImportant
    }

    setTaskList(newTaskList);
  }

  const handleImportantTask = (id) => {
    const newTaskList = [...taskList];

    newTaskList[id] = {
      ...newTaskList[id],
      isImportant: !newTaskList[id].isImportant
    }

    if (newTaskList[id].isImportant) {
      let tempTask = newTaskList[id];
      newTaskList.splice(id, 1);
      newTaskList.unshift(tempTask);
    }

    setTaskList(newTaskList);
  }


  return (
    <div>
      <header
        className='h-40 text-center grid grid-rows-3 grid-cols-12'
      >
        <h1
          className=
          "header__title font-mono font-black text-6xl mt-12 col-start-5 col-end-9"
          style={{
            color: "#0ea5e9"
          }}
        >
          My ToDo List
        </h1>
        <p
          className='mt-2 mb-4 text-white flex row-start-3 col-start-6 col-end-10'
        >
          <span
            className=''
          >Ngày {day} tháng {month} năm {year}</span>

          <img
            className='h-6 ml-64'
            src={darkMode ? 'sun.png' : '/moon.png'}
            onClick={() => setDarkMode(!darkMode)}
            alt=''
          />
        </p>
      </header>

      <AddTask
        setListTask={setTaskList}
        mode={darkMode}
      />
      <TaskList
        array={listTaslFromLocalStorage}
        mode={darkMode}
        setComplete={handleCompleteTask}
        setImportant={handleImportantTask}
      />
    </div>
  );
}

export default App;
