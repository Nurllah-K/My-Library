import React from "react";

const BookCard = ({ bookInfo, handleModal, handleEditModal, handleRead }) => {
  const { title, date, isRead, id } = bookInfo;
  return (
    <div className="mt-5 d-flex  justify-content-between align-items-center border rounded shadow p-3">
      <div>
        <h5
          style={{
            textDecoration: isRead ? "line-through" : "none",
          }}
        >
          {title}
        </h5>
        <p>{date} </p>
      </div>

      <div className="btn-group gap-1 border rounded">
        <button
          onClick={() => handleModal(id, title)}
          className="btn btn-danger"
        >
          Delete
        </button>
        <button
          onClick={() => handleEditModal(bookInfo)}
          className="btn btn-primary"
        >
          Edit
        </button>
        <button
          onClick={() => handleRead(bookInfo)}
          className="btn btn-success"
        >
          {isRead === true ? "Read" : "Not-Read"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
