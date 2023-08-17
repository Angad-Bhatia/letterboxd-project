import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReviewFormModal from '.';

const CreateReviewModal = ({ movie }) => {
    const user = useSelector(state => state.session.user);

    if (!user?.id) {
        return <h1>You must be logged in to do this</h1>
    } else {
        return (
            <ReviewFormModal
                movie={movie}
                formType='I JUST WATCHED...'
            />
        )
    }
}

export default CreateReviewModal;
