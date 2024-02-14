import React from 'react';

export default function ChatHeader({ initial_model }) {
    return (

        <div className='tw-w-full tw-py-4 tw-flex tw-justify-center tw-items-center tw-bg-gradient-to-b tw-from-transparent tw-from-80% '>
            <h1 className='tw-text-2xl tw-text-black tw-font-bold'>{initial_model}</h1>
        </div>
    );
}
