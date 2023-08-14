import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserAllMoviesThunk } from '../../store/movies';
import { getCurrentUserAllReviewsThunk } from '../../store/reviews';
import './Profile.css';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const moviesObject = useSelector(state => state.movies.allMovies);
    const reviewsObject = useSelector(state => state.reviews.allReviews);

    useEffect(() => {
        dispatch(getCurrentUserAllMoviesThunk());
        dispatch(getCurrentUserAllReviewsThunk());
    }, [dispatch, user]);

    if (!user?.id) {
        return <h1>You have to be logged in to see this</h1>
    }

    return (
        <div className='profile-page-container'></div>
    )
}

export default ProfilePage;
