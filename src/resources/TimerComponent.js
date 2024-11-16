import React, { useState, useEffect } from 'react';

const TimerComponent = ({ time }) => {
    const [currentTime, setCurrentTime] = useState(time);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(intervalId); 
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <>{formatTime(currentTime)}</>
    );
};

export default TimerComponent;
