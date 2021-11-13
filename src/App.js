import React from "react";
import ImageLoad from "./components/image-load";
import img from "./resort.jpg";
import svg from "./output.svg";

const App = () => {
	return (
		<div style={{ width: "500px" }}>
			<ImageLoad source={img} svg={svg} alt="noe" />
		</div>
	);
};

export default App;