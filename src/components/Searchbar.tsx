import React from "react";
import { useNavigate } from "react-router";

function Searchbar() {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const timestamp = new Date().getTime();
    const newSearch = {
      term: search,
      time: timestamp,
    };

    //get the previous searches
    const previousSearches = localStorage.getItem("searches");
    let searches = previousSearches ? JSON.parse(previousSearches) : [];

    //check if the search term already exists
    const searchTermExists = searches.some(
      (item: { term: string; time: number }) => item.term === search
    );

    if (!searchTermExists) {
      //add the new search term to the array
      searches = [...searches, newSearch];
      //save the updated array to local storage
      localStorage.setItem("searches", JSON.stringify(searches));
    }

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
