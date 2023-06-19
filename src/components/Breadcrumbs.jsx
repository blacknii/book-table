import { useLocation, Link } from "react-router-dom";
import styles from "./breadcrumbs.module.css";
import { ReactPropTypes } from "react";

function Breadcrumbs(props) {
  const arr = props.arr;
  const location = useLocation();
  const len = location.pathname.split("/").length;
  return (
    <div className={styles["breadcrumbs"]}>
      {location.pathname !== "/" &&
        len <= 5 &&
        location.pathname.includes("/table/") &&
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
  arr: ReactPropTypes.arr,
};

export default Breadcrumbs;
