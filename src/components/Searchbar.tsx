import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { addSearchToLocalStorage } from "../features/search/searchThunk";
import { useAppDispatch } from "../app/hook";
import { FaSearch } from "react-icons/fa";
import { useLoadScript } from "@react-google-maps/api";

const MAPS_API_KEY = import.meta.env.VITE_PLACES_API;

// Define libraries to load (Places is required for Autocomplete)
const libraries: "places"[] = ["places"];

function Searchbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [search, setSearch] = React.useState("");
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Add these new handlers before the return statement
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Small delay to allow clicking on suggestions
    setTimeout(() => {
      setIsFocused(false);
    }, 300);
  };

  // Load the Google Maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY, // Replace with your API key
    libraries,
  });

  // Initialize AutocompleteService
  useEffect(() => {
    if (isLoaded) {
      const autocompleteService =
        new window.google.maps.places.AutocompleteService();

        // @ts-ignore
      let debounceTimer: NodeJS.Timeout;

      const fetchPredictions = () => {
        if (search.length > 2) {
          autocompleteService.getPlacePredictions(
            {
              input: search,
              types: ["(cities)"], // Restrict predictions to cities
            },
            (predictions, status) => {
              if (status === "OK" && predictions) {
                setPredictions(predictions);
                setShowSuggestions(true);
              } else {
                setPredictions([]);
                setShowSuggestions(false);
              }
            }
          );
        } else {
          setPredictions([]);
          setShowSuggestions(false);
        }
      };

      const debouncedFetchPredictions = () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          fetchPredictions();
        }, 300); // Adjust the delay as needed (e.g., 300ms)
      };

      debouncedFetchPredictions();

      return () => clearTimeout(debounceTimer);
    }
  }, [search, isLoaded]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  //const handleSelectPrediction = (
   //prediction: google.maps.places.AutocompletePrediction
   //) => {
     // Extract the city name from the prediction description
     //const cityName = prediction.description.split(",")[0].trim();
     //console.log(cityName);
     //setSearch(cityName); // Update the search state with the city name
     //setPredictions([]); // Clear predictions
     //setShowSuggestions(false); // Hide the dropdown
   //};

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search.trim() === "") return;

    const timestamp = new Date().getTime();
    const newSearch = {
      term: search.toLocaleLowerCase(),
      time: timestamp,
    };

    await dispatch(addSearchToLocalStorage(newSearch));

    navigate(`/city/${search.toLocaleLowerCase()}`);
  };

  const handleClickOnPrediction = async (prediction: string) => {
    if (!prediction) return;

    const timestamp = new Date().getTime();
    const newSearch = {
      term: prediction.toLocaleLowerCase(),
      time: timestamp,
    };

    await dispatch(addSearchToLocalStorage(newSearch));
    navigate(`/city/${prediction.toLocaleLowerCase()}`);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Search a city"
          value={search}
          onChange={handleChange}
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="block w-full bg-white px-4 pr-10 py-2 rounded-lg"
        />
        <button
          type="submit"
          className="cursor-pointer absolute inset-y-0 right-0 px-4"
        >
          <FaSearch size={12} />
        </button>
      </form>
      {/* Custom Suggestions Dropdown */}
      {showSuggestions && predictions.length > 0 && isFocused && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto divide-y-2 divide-gray-300">
          {predictions.map((prediction) => (
            <Link
              to={`city/${prediction.description.split(",")[0].trim()}`}
              key={prediction.place_id}
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() =>
                handleClickOnPrediction(
                  prediction.description.split(",")[0].trim()
                )
              }
            >
              {prediction.description}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Searchbar;
