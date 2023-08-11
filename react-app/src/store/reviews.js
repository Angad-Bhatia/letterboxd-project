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

/*********************  THUNKS  *********************/

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
    };
};

export default reviewReducer;
