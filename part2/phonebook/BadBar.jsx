export default function BadBar({ message }) {
  if (message === null) {
    return null;
  }

  return <div className="bad bar">{message}</div>;
}
