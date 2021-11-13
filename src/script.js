const potrace = require('potrace');
const fs = require('fs');

const params = {
    background: "#fff",
    color: "#ccc",
    threshold: 120,
};

potrace.trace('./resort.jpg', params, function (err, svg) {
    if (err) {
        console.log(err);
    }
    fs.writeFileSync('output.svg', svg);
});
