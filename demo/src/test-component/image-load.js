import React, { useRef, useState } from "react";
import styles from "./image-load.module.css";

const ImageLoad = ({ source, svg, alt }) => {
	const [isLoaded, setLoaded] = useState(false);
	const imgRef = useRef();

	const handleImageLoaded = () => {
		setLoaded(true);
	};

	return (
		<div className={styles.container}>
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
