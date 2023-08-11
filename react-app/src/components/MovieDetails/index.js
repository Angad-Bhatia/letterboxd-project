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
            <div className='details-movie-info-container'>
                <div className='poster-trailer-container'>
                    <img src={movie.art} className='details-movie-poster' alt='Movie Poster'></img>
                    <span className='details-movie-stats'></span>
                    <a href={movie.trailer_url} className='details-trailer-link'>Trailer</a>
                </div>
                <div className='details-movie-texts-container'>
                    <span className='details-movie-info-header'>
                        <h2 className='details-movie-title'>{movie.title}</h2>
                        <p>{movie.year} Directed by {movie.director}</p>
                    </span>
                </div>
            </div>
        </div>
    )
};

export default MovieDetails;
