import React from 'react';
import PropTypes from 'prop-types';
import styles from './DeleteConfirmationModal.scss';
import Modal from '../../../../hoc/Modal/Modal';

const deleteConfirmationModal = (props) => {
  return (
    <Modal isOpen={props.isOpen}
      onClose={props.onClose}>
      <p className={styles.ModalTitle}>
        Are you sure you want to delete this saving?
      </p>
      <div className={styles.ButtonContainer}>
        <button
          onClick={props.onClose}>
          Cancel
        </button>
        <button
          className={styles.Confirm}
          onClick={props.onConfirm}>
          Delete
        </button>
      </div>
    </Modal>
  );
}

deleteConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default deleteConfirmationModal;