import React from "react";
import { useNavigate } from "react-router";
import { addSearchToLocalStorage } from "../features/search/searchThunk";
import { useAppDispatch } from "../app/hook";
import { FaSearch } from "react-icons/fa";

function Searchbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [search, setSearch] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const timestamp = new Date().getTime();
    const newSearch = {
      term: search.toLocaleLowerCase(),
      time: timestamp,
    };

    await dispatch(addSearchToLocalStorage(newSearch));

    navigate(`/city/${search}`);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Search a city"
          value={search}
          onChange={handleChange}
          className="block w-full bg-white px-4 py-2 rounded-lg"
        />
        <button className="absolute inset-y-0 right-0 px-4">
          <FaSearch size={12} />
        </button>
      </form>
    </div>
  );
}

export default Searchbar;
