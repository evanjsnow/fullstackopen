import { useState, useEffect } from "react";

export default function SearchForm({
  searchQuery,
  searchPlaceholder,
  onSearchFocus,
  onSearchChange,
  onSearchBlur,
}) {
  return (
    <>
      <label>Search for a country:</label>
      <br />
      <input
        id="textFieldClass"
        onFocus={onSearchFocus}
        onBlur={onSearchBlur}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        value={searchQuery}
      />
      <br />
    </>
  );
}
