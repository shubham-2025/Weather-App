import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  getSearchesFromLocalStorage,
  removeSearchFromLocalStorage,
} from "../features/search/searchThunk";
import { Link } from "react-router";
import { FaCircleXmark } from "react-icons/fa6";
import Searchbar from "./Searchbar";

function Sidebar() {
  const dispatch = useAppDispatch();
  const { previousSearches } = useAppSelector((state) => state.search);

  useEffect(() => {
    dispatch(getSearchesFromLocalStorage());
  }, []);

  return (
    <div className="max-md:hidden sidebar rounded-r-md fixed inset-y-0 z-50 bg-white p-4 min-w-[18rem]">
      <div className="space-y-8 divide-y-2 divide-gray-500">
        <div className="py-4">
          <Searchbar />
        </div>
        <div className="space-y-4">
          {previousSearches.map((search) => (
            <Link
              to={`city/${search.term}`}
              key={search.term}
              className="s block relative w-full p-2 rounded-md shadow-md hover:shadow-lg hover:scale-110 transition-transform duration-300"
            >
              <p className="text-xl font-[600]">{search.term}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch(removeSearchFromLocalStorage(search));
                }}
                className=" absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 hover:text-red-500 cursor-pointer"
              >
                <FaCircleXmark className="" size={16} />
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
