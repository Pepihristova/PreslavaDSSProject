import React, { useState} from 'react';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
const initialBooksList = [
  {
    id: 1,
    title: "Knife",
    author: "Jo Nesbo",
    isbn: "0000000000",
    price: "20.50",
    publicationDate: "2013-09-12",
  },
  {
    id: 2,
    title: "Bloody Moon",
    author: "Jo Nesbo",
    isbn: "1111111111",
    price: "29.33",
    publicationDate: "2015-02-02",
  }
];

function App() {
Navbar() ;

  const [books, setBooks] = useState(initialBooksList);
  const [selectedBook, setSelectedBook] = useState({ id: '', title: '', author: '', isbn: '', price: '', publicationDate: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedBook({ ...selectedBook, [name]: value });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const timeZoneOffset = -date.getTimezoneOffset() / 60;
    const timeZoneOffsetString = (timeZoneOffset >= 0 ? '+' : '') + timeZoneOffset.toString().padStart(2, '0') + '00';

    return `${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]} ${day} ${year} ${hours}:${minutes}:${seconds} GMT${timeZoneOffsetString} (Източноевропейско лятно часово време)`;
  };

  const handleSave = () => {
    if (!selectedBook.title || !selectedBook.author || !selectedBook.isbn || !selectedBook.price || !selectedBook.publicationDate) {
      alert('All fields must be filled out');
      return;
    }

    const formattedDate = formatDate(selectedBook.publicationDate);

    if (selectedBook.id) {
      const updatedBooks = books.map(book => (book.id === selectedBook.id ? { ...selectedBook, publicationDate: formattedDate } : book));
      setBooks(updatedBooks);
    } else {
      const newBook = { ...selectedBook, id: books.length + 1, publicationDate: formattedDate };
      setBooks([...books, newBook]);
    }
    handleClear();
  };

  const handleDelete = (id) => {
    const updatedBooks = books.filter(book => book.id !== id).map((book, index) => ({ ...book, id: index + 1 }));
    setBooks(updatedBooks);
    handleClear();
  };

  const handleClear = () => {
    setSelectedBook({ id: '', title: '', author: '', isbn: '', price: '', publicationDate: '' });
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className="mainDiv">
      <Navbar />
      <div className="books">
      <div className="booksitself">
        <ul className="content-list">
          {books.length > 0 ? (
            books.map(book => (
              <li key={book.id} onClick={() => handleSelectBook(book)}>
                <span className="id">{book.id}</span>
                <p className="field1">{book.title}</p>
                <p className="field2">{book.author}</p>
                <p className="field3">{book.isbn}</p>
                <p className="field4">{book.price}</p>
                <p className="field5">{book.publicationDate}</p>
                <button className="deleteButton" onClick={(e) => { e.stopPropagation(); handleDelete(book.id); }}>Delete</button>
              </li>
            ))
          ) : (
            <p>No books found.</p>
          )}
        </ul>
        </div>
        <div className="content-details">
          <h2>Book Details:</h2>
          <form>
            <input id="field1" name="title" value={selectedBook.title} onChange={handleChange} placeholder="Title" required />
            <input id="field2" name="author" value={selectedBook.author} onChange={handleChange} placeholder="Author" required />
            <input id="field3" name="isbn" value={selectedBook.isbn} onChange={handleChange} placeholder="ISBN" required />
            <input id="field4" name="price" value={selectedBook.price} onChange={handleChange} placeholder="Price" required />
            <input id="field5" name="publicationDate" type="date" value={selectedBook.publicationDate} onChange={handleChange} required />
            <button id="saveButton" type="button" onClick={handleSave}>Save</button>
            <button id="clearButton" type="button" onClick={handleClear}>Clear</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );

  Footer();
}



export default App;