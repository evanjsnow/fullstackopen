import { useState, useEffect } from "react";
import CountryInfo from "./CountryInfo";
import ShowButton from "./ShowButton";

export default function ResultList({ searchQuery, allCountries }) {
  const countryArr = [...allCountries];
  const [results, setResults] = useState(null);
  const [showInfo, setShowInfo] = useState(null);

  useEffect(() => {
    if (searchQuery.length === 0) {
      setResults("");
      setShowInfo(null);
    } else if (searchQuery.length > 0) {
      const matchArr = countryArr.filter((country) =>
        country.name.common.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      const nameList = matchArr.map((country) => (
        <li key={country.tld}>
          {country.name.common}&nbsp;&nbsp;
          {matchArr.length > 1 && (
            <ShowButton onShowInfoClick={() => handleShowInfoClick(country)} />
          )}
        </li>
      ));
      if (nameList.length > 1) {
        setResults(nameList);
      } else if (nameList.length === 1) {
        setResults(
          <>
            {nameList}
            <CountryInfo country={matchArr[0]} />
          </>
        );
        setShowInfo(null);
      } else if (nameList.length === 0) {
        setResults("No matches found");
      }
    }
  }, [searchQuery]);

  function handleShowInfoClick(country) {
    setShowInfo(<CountryInfo country={country} />);
  }

  return (
    <>
      {results} {showInfo}
    </>
  );
}
