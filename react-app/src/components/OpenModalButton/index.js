import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  provideClass
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  const openModalClassName = (text) => {
    if (buttonText === 'Write Review') {
      return 'create-review-button manage-review-button';
    } else if (buttonText === 'Edit Review') {
      return 'edit-review-button manage-review-button'
    } else if (buttonText === 'Delete Your Review') {
      return 'delete-review-button manage-review-button'
    } else if (buttonText === 'Log In' || buttonText === 'Sign Up') {
      return 'logout-button'
    }
  }

  return (
    <button onClick={onClick}
      className={openModalClassName(buttonText)}
    >{buttonText}</button>
  );
}

export default OpenModalButton;
