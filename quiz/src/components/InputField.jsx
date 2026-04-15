const InputField = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder="Enter your name"
      className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};
export default InputField;