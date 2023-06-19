import { useState } from "react";
import Table from "./Table";
import Details from "./Details";
import styles from "./tableWithDetails.module.css";

import { useParams } from "react-router-dom";
import { useBooksData } from "../../hooks/useBooksData";

function TableWithDetails() {
  const params = useParams();
  const author = params.author;
  const pageId = params.pageId;
  const bookId = params.bookId;

  const [data, setData] = useState("");

  const handleRowClick = (index) => {
    setData(index);
  };

  const BooksData = useBooksData(author);

  return (
    <div className={styles["table"]}>
      <Table
        getInfo={handleRowClick}
        page={pageId}
        book={bookId}
        author={author}
        BooksData={BooksData}
      />
      <Details bookId={bookId} BooksData={BooksData} />
    </div>
  );
}

export default TableWithDetails;
