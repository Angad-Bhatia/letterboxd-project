import React, { useState, useEffect } from 'react';
import './DisplayStars.css';

const DisplayStars = ({ numStars, optText }) => {
    const [stars, setStars] = useState(<i className='fa-solid fa-star'></i>);
    const starsArray = [];
    useEffect(() => {

    }, [numStars]);
    for (let i = 1; i <= numStars; i++) {
        starsArray.push(i);
    }

    return (
        <div className='stars-display-container'>
            {optText} {starsArray.map(el => (
                <i className='fa-solid fa-star'></i>
            ))}
        </div>
    );
};

export default DisplayStars;
