export default function Contact({ contact, onDeleteClick }) {
  return (
    <div>
      {contact.name} {contact.number}&nbsp;&nbsp;&nbsp;
      <button className="buttonSmall" onClick={() => onDeleteClick(contact.id)}>
        {"\u00D7"}
      </button>
      <br />
      <br />
    </div>
  );
}
