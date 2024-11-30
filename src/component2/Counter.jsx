import React, { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);

    const handlePlus = () => {
        setCount(count + 1);
    }
    const handleMinus = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    return (
        <div>
            <button onClick={handleMinus}>-</button>
            {count}
            <button onClick={handlePlus}>+</button>
        </div>
    )
}

export default Counter
