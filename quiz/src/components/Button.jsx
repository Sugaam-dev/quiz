const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
    >
      {children}
    </button>
  );
};
export default Button;