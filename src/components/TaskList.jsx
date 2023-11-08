import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

TaskList.propTypes = {
    array: PropTypes.array,
    mode: PropTypes.bool,
    setComplete: PropTypes.func,
    setImportant: PropTypes.func
};

function TaskList({ array, mode, setComplete, setImportant }) {
    const handleComplete = (id) => {
        setComplete(id);
    }

    const handleImportant = (id) => {
        setImportant(id);
    }


    return (
        <div
            className=
            {mode ? "w-6/12 h-96 bg-slate-700 mt-4 mx-auto rounded-md overflow-auto" : "w-6/12 h-96 bg-slate-200 mt-4 mx-auto rounded-md overflow-auto"}

        >
            {array.map((item, id) => (
                <Task
                    key={id}
                    data={item}
                    index={id}
                    mode={mode}
                    complete={handleComplete}
                    important={handleImportant}
                />
            ))}
        </div>
    );
}

export default TaskList;