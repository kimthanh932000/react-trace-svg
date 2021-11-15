const getTracedSVG = require('../index');
const fs = require('fs');
const path = require('path');
const des = path.resolve(__dirname, `./mv-img.png`);

const writeToFile = (des, data) => {
    fs.writeFile(des, JSON.stringify(data, null, 2), err => {
        if (err) {
            console.log(err);
        } else {
            console.log('--Write file successfully.');
        }
    })
}

getTracedSVG(des)
    .then(res => {
        const des = path.resolve(__dirname, './data-svg.json');
        writeToFile(des, res);
    })
    .catch(err => {
        console.log(err);
    })