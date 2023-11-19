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
            {mode ? "2xl:w-6/12 2xl:h-96 md:w-4/5 md:h-2/3 mt-4 mx-auto bg-slate-700 rounded-md overflow-auto w-11/12"
                : "2xl:w-6/12 2xl:h-96 md:w-4/5 md:h-2/3 mt-4 mx-auto bg-slate-200 rounded-md overflow-auto w-11/12"}
            style={{
            }}
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