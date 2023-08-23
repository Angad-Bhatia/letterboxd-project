import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserAllMoviesThunk, deleteMovieThunk } from '../../store/movies';
import { getCurrentUserAllReviewsThunk } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import EditReviewModal from '../ReviewFormModal/EditReview';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import DisplayStars from '../DisplayStars';
import { dateToString } from '../../helpers';
import './Profile.css';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const moviesObject = useSelector(state => state.movies.allMovies);
    const reviewsObject = useSelector(state => state.reviews.allReviews);
    const movies = Object.values(moviesObject).sort((movie1, movie2) => movie2.id - movie1.id);
    const reviews = Object.values(reviewsObject).sort((review1, review2) => review2.id - review1.id);

    useEffect(() => {
        dispatch(getCurrentUserAllMoviesThunk());
        dispatch(getCurrentUserAllReviewsThunk());
    }, [dispatch, user]);

    useEffect(() => {
        dispatch(getCurrentUserAllReviewsThunk());
    }, [dispatch, movies]);

    if (!user?.id) {
        return <h1>You have to be logged in to see this</h1>
    }

    return (
        <div className='profile-page-container'>
            <div className='profile-header-container'>
                <h3>{user.username}</h3>
                <div className='user-stats-container'>
                    <div className='user-film-stats'>
                        <h3>{movies.length}</h3>
                        <p>FILM{movies.length === 1 ? '': 'S'}</p>
                    </div>
                    <div className='user-review-stats'>
                        <h3>{reviews.length}</h3>
                        <p>REVIEW{reviews.length === 1 ? '': 'S'}</p>
                    </div>
                </div>
            </div>
            {/* <div className='profile-tabs'>
                <p>Films</p>
                <p>Reviews</p>
            </div> */}
            <div className='profile-recent-movies'>
                <p className='recent-films-header'>RECENT FILMS</p>
                <div className='profile-movies-container'>
                    {movies.slice(0,4).map(movie => (
                        <div className='home-single-movie-container' key={movie.id}>
                            <Link to={`/movies/${movie.id}`}>
                                <img src={movie.art} className='home-movie-posters' alt='Movie Poster'></img>
                            </Link>
                            <div className='profile-movies-manage-buttons'>
                                <NavLink to={`/movies/${movie.id}/edit`}>Edit</NavLink>
                                <OpenModalButton
                                    modalComponent={<DeleteConfirmationModal deleteId={movie.id} deleteType={`film:
${movie.title}`}/>}
                                    buttonText={'DELETE'}
                                />
                                {/* <button onClick={e => dispatch(deleteMovieThunk(movie.id))}>Delete</button> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='profile-recent-reviews'>
                <p className='recent-films-header'>RECENT REVIEWS</p>
                <ul className='profile-reviews-list'>
                    {reviews.map(review => (
                        <li className='home-reviews-li' key={review.id}>
                            <img className='home-review-movie-poster' src={review.movie.art} alt='Movie Poster'></img>
                            <div className='profile-review-info-container'>
                                <span className='profile-review-movie-info'>
                                    <h3 className='profile-review-movie-title'>{review.movie.title}</h3>
                                    <h6 className='profile-review-movie-year'>{review.movie.year}</h6>
                                </span>
                                <span className='profile-review-user-info'>
                                    <p className='profile-review-num-stars'><DisplayStars numStars={review.stars}/></p>
                                    <p className='profile-review-date'>Watched {dateToString(review.updatedAt)}</p>
                                </span>
                                <p className='profile-review-description-text'>&nbsp;&nbsp;&nbsp;{review.description}</p>
                                <p className='profile-review-isliked'>{review.like && <i className='fa-solid fa-heart'></i>}</p>
                                <div className='profile-reviews-buttons-container'>
                                    <OpenModalButton
                                        modalComponent={<EditReviewModal movie={review.movie} reviewId={review.id}/>}
                                        buttonText="Edit Review"
                                    />
                                    <OpenModalButton
                                        modalComponent={<DeleteConfirmationModal deleteId={review.id} deleteType="review"/>}
                                        buttonText="Delete Review"
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ProfilePage;
