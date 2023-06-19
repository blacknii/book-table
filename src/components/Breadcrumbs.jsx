import { useLocation, Link } from "react-router-dom";
import styles from "./breadcrumbs.module.css";
import PropTypes from "prop-types";

function Breadcrumbs(props) {
  const arr = props.arr;
  const location = useLocation();
  console.log(location.pathname.split("/"));
  return (
    <div className={styles["breadcrumbs"]}>
      {location.pathname.includes("/table/") &&
        arr.map(
          (e) =>
            e[1] && (
              <Link key={e[1]} to={e[0]}>
                {e[1]}
              </Link>
            )
        )}
    </div>
  );
}

Breadcrumbs.propTypes = {
  arr: PropTypes.array,
};

export default Breadcrumbs;
