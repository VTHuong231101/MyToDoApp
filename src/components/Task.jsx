import React from 'react';
import PropTypes from 'prop-types';

Task.propTypes = {

};

function Task({ data, index, mode, complete, important }) {
    return (
        <div
            className={mode ? 'w-full h-14 bg-slate-600' : 'w-full h-14 bg-white'}
            style={mode ? { borderBottom: "1px solid #232323" } : { borderBottom: "1px solid #e0e0e0" }}
        >
            <div
                className='pl-3 flex'
                style={{
                    lineHeight: "56px"
                }}
            >

                <div className='flex flex-1'>
                    <img
                        className='h-6 self-center'
                        src=
                        {mode ? (data.isCompleted ? '/checkbox_in_darkMode.png' : '/unchecked_in_darkMode.png') :
                            (data.isCompleted ? '/box__checked.png' : '/box__unchecked.png')}

                        onClick={() => complete(index)}
                        alt=''
                    />

                    <h3
                        className=
                        {data.isCompleted ? "line-through ml-2 text-black" : "ml-2 text-black"}
                        style={mode ? { color: "#ccc" } : { color: "#000" }}
                    >
                        {data.title}
                    </h3>
                </div>

                <img
                    className='h-5 self-center mr-3'
                    src={data.isImportant ? '/is_important.png' : '/no_important.png'}
                    onClick={() => important(index)}
                    alt=''
                />
            </div>
        </div>
    );
}

export default Task;