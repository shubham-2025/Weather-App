import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  getSearchesFromLocalStorage,
  removeSearchFromLocalStorage,
} from "../features/search/searchThunk";
import { Link } from "react-router";
import { FaCircleXmark, FaX } from "react-icons/fa6";
import Searchbar from "./Searchbar";
import { FaSearch } from "react-icons/fa";

function Sidebar() {
  const dispatch = useAppDispatch();
  const { previousSearches } = useAppSelector((state) => state.search);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getSearchesFromLocalStorage());
  }, []);

  return (
    <>
      <div className="sidebar md:hidden py-4 px-4 flex justify-end">
        <button className="cursor-pointer" onClick={() => setOpen((x) => !x)}>
          <FaSearch />
        </button>
      </div>
      <div
        className={`sidebar rounded-r-md fixed max-md:right-0 inset-y-0 z-50 bg-white p-4 min-w-[18rem] transition-all duration-300 ${
          open ? "max-md:translate-x-0 " : "max-md:translate-x-full "
        }`}
      >
        <div className="md:hidden flex justify-end">
          <button className="cursor-pointer" onClick={() => setOpen((x) => !x)}>
            <FaX />
          </button>
        </div>
        <div className="space-y-8 divide-y-2 divide-gray-500">
          <div className="py-4">
            <Searchbar />
          </div>
          <div className="space-y-4">
            {previousSearches.length > 0 ? (
              previousSearches.map((search) => (
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
              ))
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-center">No previous searches</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
