import React, { useEffect } from 'react';
import { useParams, NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieByIdThunk } from '../../store/movies';
import './MovieDetails.css'

const MovieDetails = () => {
    const { movieId } = useParams();
    const dispatch = useDispatch();
    const movie = useSelector(state => state.movies.singleMovie[movieId]);

    useEffect(() => {
        dispatch(getMovieByIdThunk(movieId));
    }, [dispatch, movieId]);

    if (!movie?.id) {
        return <h1 className='not-found-conditional'>Film Not Found</h1>
    }
    console.log(movie);
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
                                <tr className='details-tr'>
                                    <td className='details-key-td'>
                                        <p>GENRE</p>
                                        <div className='details-empty-border'></div>
                                    </td>
                                    <td>{movie.genre}</td>
                                </tr>
                                <tr className='details-tr'>
                                    <td className='details-key-td'>
                                        <p>RATING</p>
                                        <div className='details-empty-border'></div>
                                    </td>
                                    <td>{movie.rating}</td>
                                </tr>
                                <tr className='details-tr'>
                                    <td className='details-key-td'>
                                        <p>DIRECTOR</p>
                                        <div className='details-empty-border'></div>
                                    </td>
                                    <td>{movie.director}</td>
                                </tr>
                                <tr className='details-tr'>
                                    <td className='details-key-td'>
                                        <p>WRITER</p>
                                        <div className='details-empty-border'></div>
                                    </td>
                                    <td>{movie.writer}</td>
                                </tr>
                                <tr className='details-tr'>
                                    <td className='details-key-td'>
                                        <p>CAST</p>
                                        <div className='details-empty-border'></div>
                                    </td>
                                    <td>{movie.cast}</td>
                                </tr>
                            </table>
                        </div>
                        <div className='details-right-add-review-container'>

                        </div>
                    </div>
                </div>
                <div className='movie-details-reviews-container'></div>
            </div>
        </div>
    )
};

export default MovieDetails;
