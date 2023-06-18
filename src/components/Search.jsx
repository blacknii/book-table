import { useState } from "react";
import styles from "./search.module.css";
import { Link } from "react-router-dom";
import { useAuthorData } from "../data/useAuthorData"; // import the new hook

function Search() {
  const [search, setSearch] = useState("");
  const authors = useAuthorData(search); // use the new hook

  const handleKeyPress = (evt) => {
    if (evt.key === "Enter") {
      setSearch(evt.target.value);
    }
  };

  return (
    <div className={styles["search"]}>
      <h1 className={styles["title"]}>AUTHORS</h1>
      <h2 className={styles["subtitle"]}>Search for an Author</h2>
      <div className={styles["search"]}>
        <input
          type="text"
          placeholder="Enter Your Author Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress} // added handleKeyPress event
        />
      </div>
      <div className={styles["authors"]}>
        {authors.map((author) => (
          <Link
            to={`table/${author}/1`}
            className={styles["authorLink"]}
            key={author}
          >
            <h3 className={styles["authorName"]}>{author}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Search;
