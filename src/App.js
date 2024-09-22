import React, { useState } from "react";
import axios from "axios";
import "./Bajaj.css";

const options = ["Numbers", "Alphabets", "Highest lowercase alphabets"];

export default function Bajaj() {
	const [data, setData] = useState("");
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState("");
	const [showFinalSubmit, setShowFinalSubmit] = useState(false);
	const [apiResponse, setApiResponse] = useState(null);

	const handleInputChange = (e) => {
		setData(e.target.value);
	};

	const handleSelectChange = (e) => {
		const { value } = e.target;
		if (!selectedOptions.includes(value)) {
			setSelectedOptions([...selectedOptions, value]);
			setShowFinalSubmit(true);
		}
	};

	const handleRemoveOption = (optionToRemove) => {
		const updatedOptions = selectedOptions.filter(
			(option) => option !== optionToRemove
		);
		setSelectedOptions(updatedOptions);
		if (updatedOptions.length === 0) {
			setShowFinalSubmit(false);
		}
	};

	const handleInitialSubmit = () => {
		try {
			JSON.parse(data);
			setIsSubmitted(true);
			setError("");
		} catch (e) {
			setError("Please provide valid JSON input.");
		}
	};

	const handleFinalSubmit = async () => {
		try {
			let data1 = JSON.parse(data);
			const response = await axios.post(
				"https://bajaj-finserv-backend-production-9294.up.railway.app/bfhl",
				{ data: data1.data }
			);
			setApiResponse(response.data);
		} catch (error) {
			setError("Error sending data to API.");
		}
	};

	return (
		<div className="container">
			<input
				type="text"
				placeholder="Enter JSON"
				value={data}
				onChange={handleInputChange}
				className="input-field"
			/>
			<br />
			{error && <div className="error-message">{error}</div>}
			<button onClick={handleInitialSubmit} className="submit-button">
				Submit
			</button>
			<br />
			{isSubmitted && (
				<div className="dropdown-container">
					<h3>Select Options:</h3>
					<div className="selected-options">
						{selectedOptions.map((option, index) => (
							<div key={index} className="selected-option">
								{option}
								<span
									className="remove-option"
									onClick={() => handleRemoveOption(option)}
								>
									&times;
								</span>
							</div>
						))}
					</div>
					<select value="" onChange={handleSelectChange} className="dropdown">
						<option value="" disabled>
							Select
						</option>
						{options.map((option, index) => (
							<option key={index} value={option}>
								{option}
							</option>
						))}
					</select>
					{showFinalSubmit && (
						<button onClick={handleFinalSubmit} className="final-submit-button">
							Final Submit
						</button>
					)}
				</div>
			)}
			{apiResponse && (
				<div className="api-response">
					<h3>API Response:</h3>
					{selectedOptions.includes("Numbers") && (
						<pre>Numbers: {apiResponse.numbers.join(", ")}</pre>
					)}
					{selectedOptions.includes("Alphabets") && (
						<pre>Alphabets: {apiResponse.alphabets.join(", ")}</pre>
					)}
					{selectedOptions.includes("Highest lowercase alphabets") && (
						<pre>
							NumHighest lowercase alphabets:{" "}
							{apiResponse.highest_lowercase_alphabet.join(", ")}
						</pre>
					)}
				</div>
			)}
		</div>
	);
}
