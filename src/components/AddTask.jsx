import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AddTask.css';

AddTask.propTypes = {
    setListTask: PropTypes.func,
    mode: PropTypes.bool
};

function AddTask({ setListTask, mode }) {
    const [job, setJob] = useState({});

    const handleSubmitJob = () => {
        const inputValue = document.querySelector('input').value;

        if (inputValue !== '') {
            setListTask(prev => [...prev, job])
            document.querySelector('input').value = '';
        }
    }

    return (
        <div
            className='mx-auto rounded-md flex overflow-hidden 2xl:w-6/12 2xl:h-14 md:w-4/5 w-11/12'
            style={{
                backgroundColor: '#e0e0e0'
            }}
        >
            <input
                type='text'
                placeholder='Add your tasks'
                className=
                {mode ? 'border-transparent h-14 w-11/12 pl-4 outline-none bg-slate-700 text-slate-100' : 'border-transparent h-14 w-11/12 pl-4 outline-none'}
                onChange={e => setJob({
                    title: e.target.value.trim(),
                    isCompleted: false,
                    isImportant: false
                })}
                onKeyUp={(e) => e.key === 'Enter' && handleSubmitJob()}
            />

            <button
                className=
                {mode ? 'w-28 h-14 bg-slate-700 hover:bg-slate-600' : 'w-28 h-14 bg-white hover:bg-slate-200'}
                style={mode ? { borderLeft: '2px solid #232323' } : { borderLeft: '2px solid #e0e0e0' }}
                onClick={() => handleSubmitJob()}
            >
                <img
                    src={mode ? "plus_in_darkMode.png" : "/plus.png"}
                    alt=''
                    className='h-5 w-5 my-auto mx-auto' />
            </button>
        </div>
    );
}

export default AddTask;
