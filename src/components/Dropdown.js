import React from "react";

const Dropdown = ({ options, onChange }) => {
  return (
    <select
      multiple
      onChange={(e) =>
        onChange([...e.target.selectedOptions].map((o) => o.value))
      }
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
