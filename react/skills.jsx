import React, { useState, useEffect } from 'react';
import { skills } from './data.js';

export default function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("Counter mounted");
    }, []);

    return (
        <>
            <button onClick={() => setCount(c => c + 1)}>
                Count: {count}
            </button>
            {/* TODO: ADD SOMETHING 3D */}
        </>
    );
}