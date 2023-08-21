import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteMovieThunk } from "../../store/movies";
import { deleteReviewThunk } from "../../store/reviews";
import "./DeleteConfirmation.css";

const DeleteConfirmationModal = ({ deleteId, deleteType }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    if (!deleteId || !deleteType) {
        return <h1>Nothing to be deleted</h1>
    }

    const deleteClick = async (e) => {
        e.stopPropagation();
        if (deleteType === 'review') {
            await dispatch(deleteReviewThunk(deleteId));
            closeModal();
        } else if (deleteType.startsWith('film')) {
            await dispatch(deleteMovieThunk(deleteId));
            closeModal();
        }
    };

    return (
        <div className="delete-modal-container">
            <pre><h1 className="delete-confirmation-text">Are you sure you want to delete this {deleteType}</h1></pre>
            <div className="delete-modal-button-container">
                <button onClick={deleteClick}className="movie-delete-button">Yes (Confirm Delete)</button>
                <button onClick={(e) => closeModal()} className="movie-delete-button">No (Cancel)</button>
            </div>
        </div>
    )
}

export default DeleteConfirmationModal;
