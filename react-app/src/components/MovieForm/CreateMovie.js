import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MovieForm from '.';

const CreateMovie = () => {
    const user = useSelector(state => state.session.user);

    if (user?.id) {
        return (
            <MovieForm
                formType='Add a Film'
            />
        )
    } else {
        return <h1>You have to be logged in to see this</h1>
    }
};

export default CreateMovie;
