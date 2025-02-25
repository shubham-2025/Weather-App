import { createSlice } from "@reduxjs/toolkit";
import {
  addSearchToLocalStorage,
  getSearchesFromLocalStorage,
  removeSearchFromLocalStorage,
} from "./searchThunk";

interface searchState {
  previousSearches: Array<SearchType>;
}

const initialState: searchState = {
  previousSearches: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearch: (state, action) => {
      state.previousSearches.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSearchesFromLocalStorage.fulfilled, (state, action) => {
        state.previousSearches = action.payload.sort(
          (a: SearchType, b: SearchType) => b.time - a.time
        );
      })
      .addCase(addSearchToLocalStorage.fulfilled, (state, action) => {
        if (
          !state.previousSearches.find(
            (search) => search.term === action.payload.term
          )
        ) {
          state.previousSearches.push({
            term: action.payload.term,
            time: Number(action.payload.time),
          });
          state.previousSearches.sort((a, b) => b.time - a.time);
        }
      })
      .addCase(removeSearchFromLocalStorage.fulfilled, (state, action) => {
        state.previousSearches = state.previousSearches.filter(
          (search) => search.term !== action.payload.term
        );
      });
  },
});

export const { addSearch } = searchSlice.actions;

export default searchSlice.reducer;
