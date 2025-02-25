import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  getSearchesFromLocalStorage,
  removeSearchFromLocalStorage,
} from "../features/search/searchThunk";
import { Link } from "react-router";

function Sidebar() {
  const dispatch = useAppDispatch();
  const { previousSearches } = useAppSelector((state) => state.search);

  useEffect(() => {
    dispatch(getSearchesFromLocalStorage());
  }, []);

  return (
    <div className="border-b-2">
      {previousSearches.map((search) => (
        <Link to={`city/${search.term}`} key={search.term}>
          <p>{search.term}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(removeSearchFromLocalStorage(search));
            }}
          >
            Remove
          </button>
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
