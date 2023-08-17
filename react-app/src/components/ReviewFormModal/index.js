import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createReviewThunk, updateReviewThunk } from '../../store/reviews';
import { reviewValidation } from '../../helpers';
import './ReviewForm.css';

const ReviewFormModal = ({ movie, formType, review }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [like, setLike] = useState(review?.like ? true : false);
    const [stars, setStars] = useState(review?.stars ? review.stars : 0);
    const [description, setDescription] = useState(review?.description);
    const [errors, setErrors] = useState({ flag: false });

    const starsArray = [1, 2, 3, 4, 5];

    const reviewSubmit = async (e) => {
        e.preventDefault();
        setErrors({ flag: false });

        const formData = { like, stars, description };
        const frontEndErrors = reviewValidation(formData);
        setErrors(frontEndErrors);

        if (!frontEndErrors.flag) {
            let reviewResponse;

            if (formType === 'I JUST WATCHED...') {
                reviewResponse = await dispatch(createReviewThunk(movie.id, formData));
            } else if (formType === 'EDIT DIARY ENTRY') {
                reviewResponse = await dispatch(updateReviewThunk(review.id, formData));
            }

            if (!reviewResponse?.id) {
                setErrors({ ...reviewResponse, flag: true });
            } else {
                closeModal();
            }
        }
    };

    const handleCancelClick = (e) => {
        e.stopPropagation();
        closeModal();
    }

    useEffect(() => {
        console.log('soon to be data', stars, like, description);
    }, [like, stars])

    if (!movie?.id) {
        return <h1>Movie not Found</h1>
    }

    return (
        <div className='review-form-modal-container'>
            {/* <div className='review-modal-poster-container'> */}
            <img src={movie.art} alt='movie-poster' className='review-form-poster'></img>
            {/* </div> */}
            <form className='review-form' onSubmit={reviewSubmit}>
                <p className='review-form-type'>{formType}</p>
                <h1>{movie.title}
                    <span className='review-form-movie-year'> {movie.year}</span>
                </h1>
                <div className='review-field'>
                    <textarea
                        id="create-description-text"
                        placeholder="Add a review..."
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required
                    />
                    {errors.description ? <p className="errors">{errors.description}</p> : null}
                </div>

                <div className='form-rating-like-container'>
                    <div className='review-field'>
                        <div className="field-label">
                            <label htmlFor="review-stars-input">Rating</label>
                            {errors.stars ? <p className="errors">{errors.stars}</p> : null}
                        </div>
                        <div className='stars-input-container'>
                            {starsArray.map(num => (
                                <i
                                    id={`review-star${num}`}
                                    key={`review-star${num}`}
                                    className={num > stars ? "fa-regular fa-star" : "fa-solid fa-star"}
                                    onClick={(e) => setStars(num)}
                                ></i>
                            ))}
                        </div>
                    </div>

                    <div className='review-field'>
                        <div className='field-label'>
                            <label htmlFor='review-like-checkbox'>Like</label>
                        </div>
                        <i
                            className={like ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
                            style={like ? {color: "#ec8027"} : {color: "none"}}
                            id="review-like-checkbox"
                            onClick={(e) => setLike(!like)}
                        ></i>
                    </div>
                </div>

                <div id="review-form-button-container">
                    <button
                        id="review-submit-button"
                        type="submit"
                    >SAVE
                    </button>
                    <button
                        id="review-cancel-button"
                        onClick={handleCancelClick}
                    >CANCEL
                    </button>
                </div>
            </form>
        </div>
    )
};

export default ReviewFormModal;
