import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useTable, usePagination, useRowSelect } from "react-table";
import { COLUMNS } from "./columns";
import styles from "./table.module.css";
import { useNavigate } from "react-router-dom";

export const Table = (props) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => props.BooksData, [props.BooksData]);
  const navigate = useNavigate();

  const [selectedRowId, setSelectedRowId] = useState(
    String(props.page * 10 + (props.book - 1) - 10)
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: props.page - 1 },
    },
    usePagination,
    useRowSelect
  );

  const handleRowClick = (row) => {
    setSelectedRowId(row.id);
    navigate(
      "/search/" +
        props.author +
        "/" +
        (pageIndex + 1) +
        "/" +
        row.allCells[0].value
    );
  };

  useEffect(() => {
    gotoPage(parseInt(props.page) - 1);
  }, [props.page, gotoPage]);

  useEffect(() => {
    let filteredRows = page.filter((row) => {
      return row.cells[0].value === props.book;
    });

    let newId;
    if (filteredRows.length > 0) {
      newId = filteredRows[0].id;
    }

    setSelectedRowId(newId);
  }, [props, props.book, page]);

  return (
    <div>
      <div className={styles["pagination"]}>
        <button
          onClick={() => {
            gotoPage(0);
            navigate("/search/" + props.author + "1");
          }}
          disabled={!canPreviousPage}
        >
          {"First"}
        </button>
        <button
          onClick={() => {
            previousPage();
            navigate("/search/" + props.author + "/" + pageIndex);
          }}
          disabled={!canPreviousPage}
        >
          {"Previous"}
        </button>
        <span>
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <button
          onClick={() => {
            nextPage();
            navigate("/search/" + props.author + "/" + (pageIndex + 2));
          }}
          disabled={!canNextPage}
        >
          {"Next"}
        </button>
        <button
          onClick={() => {
            gotoPage(pageCount - 1);
            navigate("/search/" + props.author + "/" + pageCount);
          }}
          disabled={!canNextPage}
        >
          {"Last"}
        </button>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps({
                  onClick: () => handleRowClick(row),
                  style: {
                    backgroundColor:
                      row.id === selectedRowId ? "#f1faee" : "white",
                  },
                })}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  page: PropTypes.string,
  book: PropTypes.string,
  author: PropTypes.string,
  BooksData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      thumbnail: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.array,
      publisher: PropTypes.string,
      publishedDate: PropTypes.string,
      pageCount: PropTypes.number,
      language: PropTypes.string,
      categories: PropTypes.array,
      snippet: PropTypes.string,
      description: PropTypes.string,
    })
  ),
};

export default Table;
