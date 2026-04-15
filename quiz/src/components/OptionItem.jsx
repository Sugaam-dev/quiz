const OptionItem = ({ option, selected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(option.id)}
      className={`p-3 border rounded-xl cursor-pointer transition
        ${selected ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
    >
      {option.image && (
        <img src={option.image} className="w-20 mb-2 rounded" />
      )}
      <p>{option.text}</p>
    </div>
  );
};

export default OptionItem;