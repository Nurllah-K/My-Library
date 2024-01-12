import React from "react";

const DeleteModal = ({ setShowDeleteModal, handleDelete, bookTitle }) => {
  return (
    <div className="modal-wrapper">
      <div className="modall ">
        <h5> {bookTitle} Do you want to delete ?</h5>
        <button
          onClick={() => setShowDeleteModal(false)}
          className="btn  btn-warning"
        >
          Give up
        </button>
        <button onClick={() => handleDelete()} className="btn btn-danger">
          Approved
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
