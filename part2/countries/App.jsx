import { useState, useEffect } from "react";
import axios from "axios";
import fetchService from "./fetchService";
import Title from "./Title";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";
import ClearButton from "./ClearButton";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [searchPlaceholder, setSearchPlaceholder] = useState("\u2315");

  useEffect(() => {
    fetchService
      .getAll()
      .then((response) => {
        setAllCountries(response.data);
      })
      .catch((error) => {
        console.log("OHHH FUUUUUCK!!!!");
      });
  }, []);

  function handleSearchFocus() {
    setSearchPlaceholder("");
  }

  function handleSearchBlur() {
    if (searchQuery.length > 0) {
      return;
    } else {
      setSearchPlaceholder("\u2315");
    }
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleClearSearchClick() {
    setSearchQuery("");
    setSearchPlaceholder("\u2315");
  }

  return (
    <>
      <Title />
      <SearchForm
        searchQuery={searchQuery}
        onSearchFocus={handleSearchFocus}
        onSearchChange={handleSearchChange}
        onSearchBlur={handleSearchBlur}
        searchPlaceholder={searchPlaceholder}
      />
      {searchQuery.length > 0 && (
        <ClearButton onClearSearchClick={handleClearSearchClick} />
      )}
      <ResultList searchQuery={searchQuery} allCountries={allCountries} />
    </>
  );
}

export default App;
