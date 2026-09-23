export default function Button({
  children,
  onClicked,
  active = false,
  className = "",
  disabled = false,
}) {
  return (
    <button
      className={`button ${className} ${active ? "button-active" : ""}`.trim()}
      onClick={onClicked}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
}
