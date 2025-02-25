import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSearchesFromLocalStorage = createAsyncThunk(
  "search/getSearchesFromLocalStorage",
  async () => {
    const searches = localStorage.getItem("searches");
    if (searches) {
      return JSON.parse(searches);
    }
    return [];
  }
);

export const addSearchToLocalStorage = createAsyncThunk(
  "search/addSearchToLocalStorage",
  async (search: SearchType) => {
    const searches = localStorage.getItem("searches");
    if (searches) {
      const searchesArray = JSON.parse(searches);
      const existingSearchIndex = searchesArray.findIndex(
        (s: SearchType) => s.term === search.term
      );
      if (existingSearchIndex !== -1) {
        searchesArray[existingSearchIndex] = search;
      } else {
        searchesArray.push(search);
      }
      localStorage.setItem("searches", JSON.stringify(searchesArray));
    } else {
      localStorage.setItem("searches", JSON.stringify([search]));
    }
    return search;
  }
);

export const removeSearchFromLocalStorage = createAsyncThunk(
  "search/removeSearchFromLocalStorage",
  async (search: SearchType) => {
    const searches = localStorage.getItem("searches");
    if (searches) {
      const searchesArray = JSON.parse(searches);
      const newSearchesArray = searchesArray.filter(
        (s: SearchType) => s.term !== search.term
      );
      localStorage.setItem("searches", JSON.stringify(newSearchesArray));
      return search;
    }
    return search;
  }
);
