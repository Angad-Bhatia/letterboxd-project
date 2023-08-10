import React, { useEffect, useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMoviesThunk } from '../../store/movies';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import './HomeLanding.css';

const HomeLandingPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const allMoviesObject = useSelector(state => state.movies.allMovies);
    const allReviewsObject = useSelector(state => state.reviews?.allReviews);
    const movies = Object.values(allMoviesObject);
    const reviews = allReviewsObject ? Object.values(allReviewsObject) : [];

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
            <div className='home-movies-container'>
                {movies.slice(0, 6).map(movie => (
                    <div className='home-single-movie-container'>
                        <Link to={`/movies/${movie.id}`} key={movie.id}>
                            <img src={movie.art} className='home-movie-posters' alt='Movie Poster'></img>
                        </Link>
                    </div>
                ))}
            </div>
            <div className='reviews-lists-explanation-container'>
                <h4 className='write-share-compile-text'>
                    Write and share reviews. Complile your own lists. Share your life in film.
                </h4>
                <p className='below-reviews-lists-text'>
                    Below are some recent reviews from this week. Sign up to create your own.
                </p>
            </div>
            <div className='home-reviews-lists-container'>
                <div className='home-reviews-container'>
                    <div className='home-reviews-header-container'>
                        <p className='home-recent-reviews'>RECENT REVIEWS</p>
                        <NavLink to='/reviews'>More</NavLink>
                    </div>
                    <ul className='home-reviews-list'>
                        {reviews.slice(0,6).map(review => (
                            <li className='home-reviews-li'>
                                
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HomeLandingPage;
