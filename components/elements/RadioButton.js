import { colorList } from "constants/statusColorList";

function RadioButton({ status, setStatus, value, title, children }) {
  return (
    <div
      style={{ backgroundColor: colorList[value] }}
      className="w-40 flex items-center justify-between p-2 rounded-md text-white"
    >
      <label className="flex items-center gap-1 font-semibold" htmlFor={value}>
        {children}
        {title}
      </label>
      <input
        type="radio"
        id={value}
        value={value}
        checked={status === value}
        onChange={(e) => setStatus(e.target.value)}
      />
    </div>
  );
}

export default RadioButton;
