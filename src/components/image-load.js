import React, { useEffect, useRef, useState } from "react";
import styles from "./image-load.module.css";
import potrace from "potrace";

const ImageLoad = ({ source, svg, alt }) => {
	// const [svg, setSVG] = useState(null);
	const [isLoaded, setLoaded] = useState(false);
	const imgRef = useRef();

	// const params = {
	// 	background: "#fff",
	// 	color: "#ccc",
	// 	threshold: 120,
	// };
	// useEffect(() => {
	// 	potrace.trace(source, params, function (err, svg) {
	// 		setSVG(svg);
	// 	});
	// }, []);

	const handleImageLoaded = () => {
		setLoaded(true);
	};

	return (
		<div className={styles.container}>
			<h1>Traced SVG</h1>
			<div className={styles.hidden}></div>
			<img
				className={styles.image}
				ref={imgRef}
				onLoad={handleImageLoaded}
				src={svg}
				alt=""
			/>
			<img
				className={styles.imagePlacehoder}
				src={source}
				alt={alt}
				style={{
					opacity: isLoaded ? "1" : "0",
				}}
			/>
		</div>
	);
};

export default ImageLoad;
