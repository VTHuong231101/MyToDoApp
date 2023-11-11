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
        className='text-center 2xl:h-40 2xl:grid 2xl:grid-rows-3 2xl:grid-cols-12 md:h-40 md:grid md:grid-rows-3 md:grid-cols-12'
      >
        <h1
          className=
          "font-mono font-black 2xl:text-6xl md:text-6xl 2xl:mt-12 md:mt-12 2xl:col-start-5 2xl:col-end-9 md:col-start-3 md:col-end-11 mt-8 text-5xl"
          style={{
            color: "#0ea5e9"
          }}
        >
          My ToDo List
        </h1>
        <p
          className='2xl:mt-2 md:mt-2 mb-4 text-white flex justify-between 2xl:row-start-3 2xl:col-start-6 2xl:col-end-10 md:row-start-3 md:col-start-5 md:col-end-12 md:ml-8 mt-4 w-11/12 mx-auto'
        >
          <span
            className='text-sm'
          >
            Ngày {day} tháng {month} năm {year}
          </span>

          <img
            className='h-6 2xl:ml-56 md:ml-40 mr-9'
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
