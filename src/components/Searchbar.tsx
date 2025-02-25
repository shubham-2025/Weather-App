import React from "react";
import { useNavigate } from "react-router";
import { addSearchToLocalStorage } from "../features/search/searchThunk";
import { useAppDispatch } from "../app/hook";

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
      term: search,
      time: timestamp,
    };

    await dispatch(addSearchToLocalStorage(newSearch));

    navigate(`/city/${search}`);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={search} onChange={handleChange} />
        <button>submit</button>
      </form>
    </div>
  );
}

export default Searchbar;
