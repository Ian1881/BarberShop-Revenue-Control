export default function Button({ children, onclicked, active = false }) {
  return (
    <button
      className={`button${active ? " button-active" : ""}`}
      onClick={onclicked}
      type="button"
    >
      {children}
    </button>
  );
}
