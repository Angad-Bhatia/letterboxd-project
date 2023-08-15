import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MovieForm from '.';

const EditMovie = () => {
    const user = useSelector(state => state.session.user);
    const { movieId } = useParams();
    const movie = useSelector(state => state.movies.allMovies[movieId]);

    if (!user?.id) {
        return <h1>You have to be logged in to see this</h1>
    } else if (!movie?.id) {
        return <h1>Film cannot be found</h1>
    } else if (user.id !== movie.user_id) {
        return <h1>Film does not belong to user</h1>
    }

    return (
        <MovieForm
            formType='Edit a Film'
            movie={movie}
        />
    )
}

export default EditMovie;
