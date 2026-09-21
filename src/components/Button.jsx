export default function Button({
  children,
  onclicked,
  active = false,
  className = "button",
  disabled = false,
}) {
  return (
    <button
      className={`button ${className}${active ? " button-active" : ""}`}
      onClick={onclicked}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
}
