import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMoviesThunk } from '../../store/movies';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import './HomeLanding.css';

const HomeLandingPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const allMoviesObj = useSelector(state => state.movies.allMovies);
    const movies = Object.values(allMoviesObj);

    useEffect(() => {
        dispatch(getAllMoviesThunk());
    }, [dispatch]);
    return (
        <div className='home-landing-container'>
            <span>** Placeholder for horizontal poster **</span>
            <div className='site-description-signup-container'>
                <div className='site-description-text-container'>
                    <h3 className='site-description-texts'>Track films you've watched</h3>
                    <h3 className='site-description-texts'>Save those you want to see</h3>
                    <h3 className='site-description-texts'>Tell your friends what's good</h3>
                </div>
                {!user?.id && <OpenModalButton
                    buttonText="GET STARTED - IT'S FREE"
                    modalComponent={<SignupFormModal />}
                />}
                <p className='site-tagline'>The social network for film lovers</p>
            </div>
        </div>
    )
}

export default HomeLandingPage;
