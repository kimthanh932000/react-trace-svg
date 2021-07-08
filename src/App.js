import React from "react";
import ImageLoad from "./components/image-load";
import img from "./bg1.jpg";
const App = () => {
	return (
		<div style={{ width: "500px" }}>
			<ImageLoad source={img} alt="noe" />
		</div>
	);
};

export default App;
