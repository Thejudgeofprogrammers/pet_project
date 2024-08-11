import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import IBookDTO from '../dtos/book';

const BookDetails: React.FC = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(`/api/books/${id}`);
      setBook(response.data);
    };
    fetchBook();
  }, [id]);

  if (!book) return <div>Loading...</div>;
  const bookType: IBookDTO = book;
  return (
    <div>
      <h2>{bookType.title}</h2>
      <p>{bookType.description}</p>
      <p>{bookType.authors}</p>
      <p>Comments: {bookType.comments.length}</p>
      {/* Add functionality to add/view comments */}
    </div>
  );
};

export default BookDetails;