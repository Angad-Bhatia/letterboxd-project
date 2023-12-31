/*****************  ACTION TYPES   ****************/

const LOAD_ALL_REVIEWS = 'reviews/LOAD_ALL_REVIEWS';
const LOAD_SINGLE_REVIEW = 'reviews/LOAD_SINGLE_REVIEW';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

/*****************  ACTION CREATORS   ****************/

// LOAD ALL Reviews Action
export const loadAllReviewsAction = (reviews) => {
    return {
        type: LOAD_ALL_REVIEWS,
        reviews
    };
};

  //LOAD ONE Review Action
export const loadSingleReviewAction = (review) => {
    return {
        type: LOAD_SINGLE_REVIEW,
        review
    };
};

// /////////////
  //CREATE a Review Action
export const createReviewAction = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    };
};

  //UPDATE a Review Action
export const updateReviewAction = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    };
};

  //DELETE a Review Action
export const deleteReviewAction = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    };
};

/*********************  THUNKS  *********************/

//GET All Reviews Thunk
export const getAllReviewsThunk = () => async (dispatch) => {
    const response = await fetch('/api/reviews');
    const reviews = await response.json();
    dispatch(loadAllReviewsAction(reviews));
    return reviews;
};


//GET All Reviews by Current User Thunk
export const getCurrentUserAllReviewsThunk = () => async (dispatch) => {
    const response = await fetch('/api/reviews/current');
    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadAllReviewsAction(reviews));
        return reviews;
    }
};

//GET Review by ID Thunk
export const getReviewByIdThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`);
    if (response.ok) {
        const review = await response.json();
        dispatch(loadSingleReviewAction(review));
        return review;
    }
};

/*********** FIX****************/
//Create a Review Thunk
export const createReviewThunk = (movieId, formData) => async (dispatch) => {
    // console.log('Create Review thunk running, this is the formData', formData)

    const response = await fetch(`/api/movies/${movieId}/new-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        // console.log('After fetch, this is the response', response)
    });


    if (response.ok) {
        const newReview = await response.json();
        dispatch(createReviewAction(newReview));
        return newReview;
    } else {
        const errors = await response.json();
        return errors.errors;
    }
};

// Edit a Review Thunk
export const updateReviewThunk = (reviewId, formData) => async (dispatch) => {
    console.log('Edit a Review Thunk, this is reviewId : ', reviewId, formData);
    const response = await fetch(`/api/reviews/${reviewId}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      // console.log('After update Review fetch, this is response : ', response)
    });
    if (response.ok) {
        const updatedReview = await response.json();
        dispatch(updateReviewAction(updatedReview));
        return updatedReview;
    } else {
        const error = await response.json();
        return error.errors;
    }
}

// Delete Review Thunk
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/delete`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteReviewAction(reviewId));
        return response;
    }
};


/*****************  REDUCER FUNCTION   ****************/

const initialState = {
    allReviews: {},
    singleReview: {}
}

const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_ALL_REVIEWS:
            const allReviewsObject = {};
            action.reviews.forEach((review) => {
                allReviewsObject[review.id] = review;
            });
            return { ...state, allReviews: allReviewsObject };
        case LOAD_SINGLE_REVIEW:
            return { ...state, allReviews: { ...state.allReviews, [action.review.id] : action.review }, singleReview: { [action.review.id] : action.review } };
        case CREATE_REVIEW:
            return { ...state, allReviews: { ...state.allReviews, [action.review.id] : action.review }, singleReview: { [action.review.id] : action.review } };
        case UPDATE_REVIEW:
            return { ...state, allReviews: { ...state.allReviews, [action.review.id] : action.review }, singleReview: { [action.review.id] : action.review } };
        case DELETE_REVIEW:
            const newReviews = { ...state.allReviews };
            delete newReviews[action.reviewId];
            return { ...state, allReviews: newReviews };
        default:
            return state;
    };
};

export default reviewReducer;
