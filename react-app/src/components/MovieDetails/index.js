import React, { useEffect, useState } from 'react';
import { useParams, NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { useModal } from '../../context/Modal';
import { getMovieByIdThunk } from '../../store/movies';
import { loadAllReviewsAction } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import CreateReviewModal from '../ReviewFormModal/CreateReview';
import EditReviewModal from '../ReviewFormModal/EditReview';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

import { dateToString } from '../../helpers';
import './MovieDetails.css'

const MovieDetails = () => {
    const dispatch = useDispatch();
    const { movieId } = useParams();
    const user = useSelector(state => state.session.user);
    const movie = useSelector(state => state.movies.singleMovie[movieId]);
    const reviewsObject = useSelector(state => state.reviews.allReviews);
    const reviews = Object.values(reviewsObject);
    const [userReview, setUserReview] = useState(false);
    // console.log('userReview', userReview);

    useEffect(() => {
        dispatch(getMovieByIdThunk(movieId));
    }, [dispatch, movieId, userReview?.updatedAt]);

    useEffect(() => {
        if (movie?.id) {
            dispatch(loadAllReviewsAction(movie.reviews));
        }
    }, [dispatch, movie]);

    useEffect(() => {
        setUserReview(reviews.find(review => review.user_id === user?.id));
    }, [reviews]);

    if (!movie?.id) {
        return <h1 className='not-found-conditional'>Film Not Found</h1>
    }

    return (
        <div className='movie-details-container'>
            <div className='poster-trailer-container'>
                <img src={movie.art} className='details-movie-poster' alt='Movie Poster'></img>
                <span className='details-movie-stats'>{movie.likes} Likes</span>
                <a href={movie.trailer_url} className='details-trailer-link' target='_blank' rel="noreferrer">
                    <i class="fa-brands fa-youtube"></i> Trailer
                </a>
            </div>
            <div className='details-right-movie-container'>
                <div className='details-movie-info-container'>
                    <span className='details-movie-info-header'>
                        <h1 className='details-movie-title'>{movie.title}</h1>
                        <p className='details-year-director'>{movie.year} Directed by {movie.director}</p>
                    </span>
                    <div className='details-movie-texts-container'>
                        <div className='details-middle-movie-info-container'>
                            <p className='details-tagline-text'>{movie.tagline}</p>
                            <p className='details-summary-test'>{movie.summary}</p>
                            <p className='cast-crew-header'>DETAILS/CAST & CREW</p>
                            <table className='details-crew-table'>
                                <tbody>
                                    <tr className='details-tr'>
                                        <td className='details-key-td'>
                                            <p className='details-key-p'>GENRE</p>
                                            <div className='details-empty-border'></div>
                                        </td>
                                        <td className='details-td-text'>{movie.genre}</td>
                                    </tr>
                                    <tr className='details-tr'>
                                        <td className='details-key-td'>
                                            <p className='details-key-p'>RATING</p>
                                            <div className='details-empty-border'></div>
                                        </td>
                                        <td className='details-td-text'>{movie.rating}</td>
                                    </tr>
                                    <tr className='details-tr'>
                                        <td className='details-key-td'>
                                            <p className='details-key-p'>DIRECTOR</p>
                                            <div className='details-empty-border'></div>
                                        </td>
                                        <td className='details-td-text'>{movie.director}</td>
                                    </tr>
                                    <tr className='details-tr'>
                                        <td className='details-key-td'>
                                            <p className='details-key-p'>WRITER</p>
                                            <div className='details-empty-border'></div>
                                        </td>
                                        <td className='details-td-text'>{movie.writer}</td>
                                    </tr>
                                    <tr className='details-tr'>
                                        <td className='details-key-td'>
                                            <p className='details-key-p'>CAST</p>
                                            <div className='details-empty-border'></div>
                                        </td>
                                        <td className='details-td-text'>{movie.cast}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='details-right-add-review-container'>
                            <p>Average Rating: {movie.star_rating} STARS</p>
                            {userReview?.stars && <p>Your Rating: {userReview.stars} STARS</p>}
                            {user?.id &&
                                <div className='details-review-buttons-container'>
                                    {userReview?.id ? (
                                        <div className='manage-review-buttons'>
                                            <OpenModalButton
                                            modalComponent={<EditReviewModal movie={movie} reviewId={userReview.id}/>}
                                            buttonText="Edit Your Review"
                                            />
                                            <OpenModalButton
                                                modalComponent={<DeleteConfirmationModal deleteId={userReview.id} deleteType="review"/>}
                                                buttonText="Delete Your Review"
                                            />
                                        </div>
                                    ) : (
                                        <OpenModalButton
                                            modalComponent={<CreateReviewModal movie={movie} className="review-form-actual-modal" />}
                                            buttonText="Write Review"
                                            className="write-review-button"
                                        />
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='movie-details-reviews-container'>
                    <p className='details-reviews-index-header'>REVIEWS</p>
                    {reviews.map(review => (
                        <div className='details-review-items' key={review.id}>
                            <p className='details-review-username-stars'>Review by {review.user.username} : {review.stars} Stars</p>
                            <p className='details-review-text'>{review.description}</p>
                            <p>{dateToString(review.updatedAt)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default MovieDetails;
