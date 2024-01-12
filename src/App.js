import { useState } from "react";
import Header from "./component/Header";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import BookCard from "./component/BookCard/BookCard";
import DeleteModal from "./component/DeleteModal/DeleteModal";
import EditModal from "./component/EditModal/EditModal";

export default function App() {
  const [bookName, setBookName] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false)

  const [deleteId, setDeleteId] = useState(null)
  const [deleteTitle, setDeleteTitle] = useState('')
  const [editItem, setEditItem] = useState({});
  const [books, setBooks] = useState([]);

  const handleChange = (e) => {
    setBookName(e.target.value);
  };
  // console.log(bookName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookName) {
      toast("Please enter book name...", { autoClose: 1000 });
      return;
    }
    const newBook = {
      id: v4(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };
    // console.log(newBook);

    setBooks([...books, newBook]);
    toast.success('Adding book was successful', { autoClose: 2000 })

    setBookName(" ");
  };

  const handleModal = (deletBookId, deleteBookTitle) => {
    setDeleteId(deletBookId)
    setDeleteTitle(deleteBookTitle)
    // console.log(deleteId);
    setShowDeleteModal(true);
  };

  // console.log(books);

  const handleDelete = () => {
    const filteredBooks = books.filter((book) => book.id !== deleteId)
    // console.log(filteredBooks);
    setBooks(filteredBooks)
    setShowDeleteModal(false)
    toast.error('Book deleted successfully', { autoClose: 2000 })

  };
  const handleEditModal = (editBook) => {
    setEditItem(editBook)
    setShowEditModal(true)

  }
  const handleEditBook = () => {

    const editIndex = books.findIndex((book) => book.id === editItem.id);

    const cloneBooks = [...books];

    cloneBooks.splice(editIndex, 1, editItem);
    setBooks(cloneBooks);
    setShowEditModal(false);
    toast.success("Book information Updated Successfully", { autoClose: 2000 });
  };
  const handleRead = (readBook) => {


    const updatedBook = { ...readBook, isRead: !readBook.isRead };

    const index = books.findIndex((book) => book.id === readBook.id);

    const cloneBooks = [...books];

    cloneBooks[index] = updatedBook;
    setBooks(cloneBooks);
  };
  return (
    <div>
      <Header />
      <div className="container">
        <form className="mt-4 d-flex gap-2" onSubmit={handleSubmit}>
          <input
            value={bookName}
            onChange={handleChange}
            className="form-control shadow"
            type="text"
            placeholder="Enter book name . . ."
          />
          <button className="btn btn-warning shadow">+</button>
        </form>

        {books.length === 0 ? (
          <h4>No books added.</h4>
        ) : (
          books.map((book) => (
            <BookCard handleEditModal={handleEditModal}
              handleModal={handleModal}
              bookInfo={book}
              key={book.id}
              handleRead={handleRead} />
          ))
        )}
      </div>
      {showDeleteModal && (
        <DeleteModal bookTitle={deleteTitle}
          handleDelete={handleDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
      {showEditModal && (<EditModal
        handleEditBook={handleEditBook}
        editItem={editItem}
        setEditItem={setEditItem}
        setShowEditModal={setShowEditModal} />)}
    </div>
  );
}
