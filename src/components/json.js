import React, { useState } from "react";
import JsonInput from "./JsonInput";
import Dropdown from "./Dropdown";
import Axios from "axios";

const App = () => {
	const [responseData, setResponseData] = useState(null);
	const [selectedOptions, setSelectedOptions] = useState([]);

	const handleJsonSubmit = async (json) => {
		console.log(json);

		Axios.post("http://localhost:4000/bfhl", { data: json }).then(
			async (data) => {
				console.log(await data.data);

				setResponseData(await data.data);
			}
		);
	};

	const renderResponse = () => {
		if (!responseData) return null;

		return (
			<div>
				{selectedOptions.includes("Alphabets") && (
					<div>
						<h3>Alphabets:</h3>
						<p>{responseData.alphabets.join(", ")}</p>
					</div>
				)}
				{selectedOptions.includes("Numbers") && (
					<div>
						<h3>Numbers:</h3>
						<p>{responseData.numbers.join(", ")}</p>
					</div>
				)}
				{selectedOptions.includes("Highest lowercase alphabet") && (
					<div>
						<h3>Highest lowercase alphabet:</h3>
						<p>{responseData.highestLowercase}</p>
					</div>
				)}
			</div>
		);
	};

	return (
		<div>
			<JsonInput onSubmit={handleJsonSubmit} />
			{responseData && (
				<Dropdown
					options={["Alphabets", "Numbers", "Highest lowercase alphabet"]}
					onChange={setSelectedOptions}
				/>
			)}
			{renderResponse()}
		</div>
	);
};

export default App;
