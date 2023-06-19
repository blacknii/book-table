import { useLocation, Link } from "react-router-dom";
import styles from "./breadcrumbs.module.css";

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // If there's only one path segment, don't render the breadcrumbs
  if (pathnames.length < 2) {
    return null; // or return any placeholder component
  }

  return (
    <div className={styles["breadcrumbs"]}>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const decodedName = decodeURIComponent(name);

        return index === pathnames.length - 1 ? (
          <span key={name}>{decodedName}</span>
        ) : (
          <span key={name}>
            <Link to={routeTo}>{decodedName}</Link>
            {" / "}
          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;
