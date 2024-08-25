import React, { useState } from "react";

const JsonInput = ({ onSubmit }) => {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      setError("");
      onSubmit(parsedJson);
    } catch (e) {
      setError("Invalid JSON");
    }
  };

  return (
    <div>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON here"
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default JsonInput;
