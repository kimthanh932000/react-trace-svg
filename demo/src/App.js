import React from "react";
import ImageLoad from "./test-component/image-load";
import img from "./image/blog";
import svgURI from './svg/trace.json';

const App = () => {
	return (
		<div style={{ width: "1000px" }}>
			<ImageLoad source={img} svg={svgURI} alt="noe" />
		</div>
	);
};

export default App;