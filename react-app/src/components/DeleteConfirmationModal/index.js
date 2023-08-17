import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
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
        }
    };

    return (
        <div className="delete-modal-container">
            <h1>Are you sure you want to delete this {deleteType}</h1>
            <div className="delete-modal-button-container">
                <button onClick={deleteClick}className="yes-delete-button">Yes (Confirm Delete)</button>
                <button onClick={(e) => closeModal()} className="cancel-delete-button">No (Cancel)</button>
            </div>
        </div>
    )
}

export default DeleteConfirmationModal;
