export default function GoodBar({ message }) {
  if (message === null) {
    return null;
  }

  return <div className="good bar">{message}</div>;
}
