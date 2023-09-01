export default function Filter(props) {
  return (
    <>
      <form>
        <p>
          <strong>Search contacts: &nbsp;</strong>
          <input
            placeholder="Search by name"
            className="textFieldClass"
            value={props.searchName}
            onChange={props.onSearchChange}
          />
        </p>
        <br />
      </form>
    </>
  );
}
