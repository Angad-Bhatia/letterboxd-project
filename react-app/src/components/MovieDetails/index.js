import React, { useEffect } from 'react';
import { useParams, NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieByIdThunk } from '../../store/movies';
import { loadAllReviewsAction } from '../../store/reviews';
import { dateToString } from '../../helpers';
import './MovieDetails.css'

const MovieDetails = () => {
    const { movieId } = useParams();
    const dispatch = useDispatch();
    const movie = useSelector(state => state.movies.singleMovie[movieId]);
    const reviewsObject = useSelector(state => state.reviews.allReviews);

    useEffect(() => {
        dispatch(getMovieByIdThunk(movieId));
    }, [dispatch, movieId]);

    useEffect(() => {
        if (movie?.id) {
            dispatch(loadAllReviewsAction(movie.reviews));
        }
    }, [dispatch, movie]);

    if (!movie?.id) {
        return <h1 className='not-found-conditional'>Film Not Found</h1>
    }
    console.log(reviewsObject);
    return (
        <div className='movie-details-container'>
            <div className='poster-trailer-container'>
                <img src={movie.art} className='details-movie-poster' alt='Movie Poster'></img>
                <span className='details-movie-stats'></span>
                <a href={movie.trailer_url} className='details-trailer-link' target='_blank' rel="noreferrer">Trailer</a>
            </div>
            <div className='details-right-movie-container'>
                <div className='details-movie-info-container'>
                    <div className='details-movie-texts-container'>
                        <span className='details-movie-info-header'>
                            <h2 className='details-movie-title'>{movie.title}</h2>
                            <p className='details-year-director'>{movie.year} Directed by {movie.director}</p>
                        </span>
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

                        </div>
                    </div>
                </div>
                <div className='movie-details-reviews-container'>
                    <p className='details-reviews-index-header'>REVIEWS</p>
                    {Object.values(reviewsObject).map(review => (
                        <div className='details-review-items' key={review.id}>
                            <p className='details-review-username-stars'>Review by {review.user.username} {review.stars}</p>
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
