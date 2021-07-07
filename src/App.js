import {useEffect, useState, useRef} from "react";
// import logo from './logo.svg';
import bg1 from './bg1.jpg';
import potrace from 'potrace';
import './App.css';

const containerStyles = {
    position: 'relative',
    width: '550px'
}

const svgStyles = {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    width: '100%',
    height: '100%',
    // opacity: 0,
    // transition: 'opacity 500ms ease'
}

const fullImgStyles = {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    width: '100%',
    height: '100%',
    opacity: 1,
    transition: 'opacity 500ms ease'
}

const params = {
    background: '#fff',
    color: '#ccc',
    threshold: 120
}

const App = () => {
    const [svg, setSVG] = useState(null);
    const [isLoaded, setLoaded] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
        console.log('image loading');

        potrace.trace(bg1, params, function(err, svg) {
            setSVG(svg);
        });
    }, [])

    const handleImageLoaded = () => {
        console.log('image loaded');
        setLoaded(true);
    }
  return (
    <div className="App" style={{...containerStyles}}>
        <img style={{...svgStyles}} ref={imgRef} onLoad={handleImageLoaded} src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`} alt="bg1" />
        <img style={{...fullImgStyles}} src={bg1} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;
