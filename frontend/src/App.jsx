import { useState } from "react";
import axios from "axios";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error("Invalid JSON format");
      }

      const { data } = await axios.post("http://localhost:5000/bfhl", parsedData);
      setResponse(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    if (selectedOption === "Alphabets") return <p>Alphabets: {response.alphabets.join(", ")}</p>;
    if (selectedOption === "Numbers") return <p>Numbers: {response.numbers.join(", ")}</p>;
    if (selectedOption === "Highest Alphabet") return <p>Highest Alphabet: {response.highest_alphabet}</p>;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">JSON Input Processor</h1>
      <textarea
        className="w-96 p-2 border rounded mt-4"
        rows="4"
        placeholder='Enter JSON (e.g. { "data": ["A", "1", "B", "2"] })'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>
        Submit
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {response && (
        <>
          <select
            className="mt-4 p-2 border rounded"
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest Alphabet">Highest Alphabet</option>
          </select>
          <div className="mt-2">{renderResponse()}</div>
        </>
      )}
    </div>
  );
};

export default App;

