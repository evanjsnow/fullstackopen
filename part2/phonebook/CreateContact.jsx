export default function CreateContact(props) {
  return (
    <>
      <form onSubmit={props.onContactSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Name:</strong>
              </td>
              <td>&nbsp;&nbsp;</td>
              <td>
                <strong>Phone Number:</strong>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  placeholder="Contact Name"
                  className="textFieldClass"
                  value={props.newName}
                  onChange={props.onNameChange}
                />
              </td>
              <td>&nbsp;&nbsp;</td>
              <td>
                <input
                  placeholder="Phone Number"
                  className="textFieldClass"
                  value={props.newNumber}
                  onChange={props.onNumberChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <br />
          <button
            type="submit"
            children="Create New Contact"
            disabled={
              props.newNumber.length === 0 || props.newName.length === 0
            }
          ></button>
          &nbsp;
          <br />
          <br />
        </div>
      </form>
    </>
  );
}
