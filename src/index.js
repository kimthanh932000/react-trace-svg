const fs = require('fs');
const path = require('path');
const { promisify } = require(`bluebird`);

const optimize = (svg) => {
    const SVGO = require(`svgo`);
    const svgo = new SVGO({
        multipass: true,
        floatPrecision: 0,
        plugins: [
            {
                removeViewBox: false,
            },
            {
                addAttributesToSVGElement: {
                    attributes: [
                        {
                            preserveAspectRatio: `none`,
                        },
                    ],
                },
            },
        ],
    })
    return svgo.optimize(svg).then(({ data }) => data);
}

const trace = async (filePath) => {

    const svgToMiniDataURI = require(`mini-svg-data-uri`);
    const potrace = require('potrace');
    const trace = promisify(potrace.trace);

    const params = {
        color: `lightgray`,
        optTolerance: 0.4,
        turdSize: 100,
        turnPolicy: potrace.Potrace.TURNPOLICY_MAJORITY,
    }

    // `srcset` attribute rejects URIs with literal spaces
    const encodeSpaces = str => str.replace(/ /gi, `%20`);

    return trace(filePath, params)
    .then(optimize)
    .then(svgToMiniDataURI)
    .then(encodeSpaces);
}

const writeToFile = (des, data) => {
    fs.writeFile(des, JSON.stringify(data, null, 2), err => {
        if (err) {
            console.log(err);
        } else {
            console.log('Write file successfully.');
        }
    }) 
}

const getTracedSVG = (filePath) => {
    trace(filePath)
    .then(data => {
        // testing
        // writeToFile(path.resolve(__dirname, './trace.json'), data);
        return data;
    })
    .catch((err) => {
        console.log('trace error', err);
    })
}
// testing
// getTracedSVG(path.resolve(__dirname, './blog'));

exports.getTracedSVG = getTracedSVG;


