export const Button = ({ onClick, children }) => {
  return (
    <button type="button" className="Button" onClick={onClick}>
      {children}
    </button>
  );
};
