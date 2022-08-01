const { promisify } = require(`bluebird`);

const optimizeSVG = (svg) => {
    const {optimize} = require('svgo');
    const result = optimize(svg, {
        multipass: true,
        floatPrecision: 0,
        plugins: [
            {
                name: 'preset-default',
                removeViewBox: false,
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
    return result.data;
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
    .then(optimizeSVG)
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

