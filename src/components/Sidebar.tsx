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
import { WiDaySunnyOvercast } from "react-icons/wi"; // Weather icon

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
        className={`sidebar rounded-r-md fixed max-md:right-0 inset-y-0 z-50 bg-white p-4 w-[18rem] transition-all duration-300 ${
          open ? "max-md:translate-x-0 " : "max-md:translate-x-full "
        }`}
      >
        {/* Close button (Mobile view) */}
        <div className="md:hidden flex justify-end">
          <button className="cursor-pointer" onClick={() => setOpen((x) => !x)}>
            <FaX />
          </button>
        </div>

        {/* 📌 Enlarged Weather App Title & Icon */}
        <div className="flex flex-col items-center justify-center space-y-2 py-4">
          <WiDaySunnyOvercast size={48} className="text-yellow-500" /> {/* Enlarged Icon */}
          <h1 className="text-3xl font-bold text-gray-800">Weather App</h1> {/* Enlarged Text */}
        </div>

        <div className="space-y-2 flex flex-col h-full">
          {/* Searchbar */}
          <div className="py-4">
            <Searchbar />
          </div>

          {/* 📌 Recent Searches */}
          <div className="space-y-4 divide-y-2 divide-gray-500 flex-1 overflow-y-scroll max-h-full overflow-x-hidden">
            <h3 className="pb-2 text-lg font-semibold">Recent Searches:</h3>
            <div className="space-y-4 p-4">
              {previousSearches.length > 0 ? (
                previousSearches.map((search) => (
                  <Link
                    to={`city/${search.term}`}
                    key={search.term}
                    className="block relative w-full p-3 rounded-md shadow-md hover:shadow-lg hover:scale-110 transition-transform duration-300 bg-gray-100"
                  >
                    <p className="text-xl font-semibold">{search.term}</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        dispatch(removeSearchFromLocalStorage(search));
                      }}
                      className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 hover:text-red-500 cursor-pointer"
                    >
                      <FaCircleXmark size={18} />
                    </button>
                  </Link>
                ))
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-center text-gray-500">No previous searches</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
 