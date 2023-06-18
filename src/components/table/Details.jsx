import React from "react";
import styles from "./details.module.css";
import defaultCover from "../../assets/default_cover.jpg"; // make sure the path to your image is correct

const Details = (props) => {
  const showInfo = (index) => {
    const book = props.BooksData.find((row) => row.id === index);
    if (!book)
      return (
        <div className={styles["book-empty"]}>
          <h2>Select a row for more information</h2>
        </div>
      );

    return (
      <div className={styles["book-info"]}>
        <img
          src={book.thumbnail || defaultCover}
          alt={book.title}
          className={styles["book-image"]}
        />
        <div className={styles["book-details"]}>
          <h2>{book.title}</h2>
          <p>
            <strong>Publisher:</strong> {book.publisher || "N/A"}
          </p>
          <p>
            <strong>Published Date:</strong> {book.publishedDate || "N/A"}
          </p>
          <p>
            <strong>Page Count:</strong> {book.pageCount || "N/A"}
          </p>
          <p>
            <strong>Language:</strong> {book.language || "N/A"}
          </p>
          <p>
            <strong>Categories:</strong> {book.categories || "N/A"}
          </p>
          <p>
            <strong>Snippet:</strong> {book.snippet || "N/A"}
          </p>
          <p>
            <strong>Description:</strong> {book.description || "N/A"}
          </p>
        </div>
      </div>
    );
  };

  return <div className={styles["info"]}>{showInfo(props.data)}</div>;
};

export default Details;
