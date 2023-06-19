import { useState, useEffect } from "react";
import axios from "axios";

export function useAuthorData(search) {
  const key = "AIzaSyD9AulRjx3A6ZJb7cP4e_t1r8Ow0pyfuXw";
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    if (search) {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=inauthor:" +
            search +
            "&key=" +
            key
        )
        .then((res) => {
          let authorsSet = new Set();
          for (let item of res.data.items) {
            if (item.volumeInfo.authors) {
              for (let author of item.volumeInfo.authors) {
                authorsSet.add(author);
              }
            }
          }
          setAuthors([...authorsSet]);
        })
        .catch((err) => console.log(err));
    }
  }, [search]);

  return authors;
}
