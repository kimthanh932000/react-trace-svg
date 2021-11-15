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

module.exports = (filePath) => {
    return new Promise((resolve, reject) => {
        trace(filePath)
            .then(data => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

