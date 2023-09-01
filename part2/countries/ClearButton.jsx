export default function ClearButton({ onClearSearchClick }) {
  return (
    <div className="clearSearchContainer">
      <button
        className="clearSearch"
        onClick={onClearSearchClick}
      >{`\u2297`}</button>
    </div>
  );
}
