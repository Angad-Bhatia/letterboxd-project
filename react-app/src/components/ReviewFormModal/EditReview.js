import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReviewFormModal from '.';

const EditReviewModal = ({ movie, reviewId }) => {
    const user = useSelector(state => state.session.user);
    const reviewsObject = useSelector(state => state.reviews.allReviews);
    const review = reviewsObject[reviewId];

    if (!user?.id) {
        return <h1>You must be logged in to do this</h1>
    } else if (!review?.id) {
        console.log('here?', reviewsObject);
        return <h1>Review Not Found</h1>
    } else if (user.id !== review.user_id) {
        return <h1>Review does not belong to user</h1>
    } else {
        return (
            <ReviewFormModal
                movie={movie}
                review={review}
                formType='EDIT DIARY ENTRY'
            />
        )
    }
}

export default EditReviewModal;
