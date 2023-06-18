import { useEffect, useState } from "react";
import BasicTableWithDetails from "./BasicTableWithDetails";
import InfoPanel from "./InfoPanel";
import styles from "./tableWithDetails.module.css";

import { useParams } from "react-router-dom";
import { useBooksData } from "./useBooksData";

function TableWithDetails(props) {
  const params = useParams();
  const author = params.author;
  const pageId = params.pageId;
  const bookId = params.bookId;

  console.log(params, author, pageId, bookId);

  const [data, setData] = useState(0);

  const handleRowClick = (index) => {
    setData(index);
  };
  //J. R. R. Tolkien
  const BooksData = useBooksData(author);

  // console.log(author);

  useEffect(() => {
    // console.log(author);
    props.breadcrumbsNavigation(author, 1);
    props.breadcrumbsNavigation(pageId, 2);
    props.breadcrumbsNavigation(bookId, 3);
  }, [author, pageId, bookId]);

  return (
    <div className="TableWithDetails">
      <BasicTableWithDetails
        getInfo={handleRowClick}
        page={pageId}
        book={bookId}
        author={author}
        BooksData={BooksData}
      />
      <InfoPanel data={data} BooksData={BooksData} />
    </div>
  );
}

export default TableWithDetails;
