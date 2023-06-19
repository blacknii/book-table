import { useEffect, useState } from "react";
import Table from "./Table";
import Details from "./Details";
import styles from "./tableWithDetails.module.css";

import { useParams } from "react-router-dom";
import { useBooksData } from "../../hooks/useBooksData";

function TableWithDetails(props) {
  const params = useParams();
  const author = params.author;
  const pageId = params.pageId;
  const bookId = params.bookId;

  const [data, setData] = useState(0);

  const handleRowClick = (index) => {
    setData(index);
  };
  //J. R. R. Tolkien
  const BooksData = useBooksData(author);
  console.log(BooksData);

  useEffect(() => {
    props.breadcrumbsNavigation(author, 1);
    props.breadcrumbsNavigation(pageId, 2);
    props.breadcrumbsNavigation(bookId, 3);
  }, [author, pageId, bookId]);

  return (
    <div className={styles["table"]}>
      <Table
        getInfo={handleRowClick}
        page={pageId}
        book={bookId}
        author={author}
        BooksData={BooksData}
      />
      <Details data={data} BooksData={BooksData} />
    </div>
  );
}

export default TableWithDetails;
