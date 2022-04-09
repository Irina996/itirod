const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload')
const app = express();

PORT = process.env.PORT || 8000

app.use(express.static(__dirname));
app.use(express.json());
app.use(fileupload(undefined),);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.post("/save-image", (req, res) => {
    // TODO: change image name to generated
    const fileName = req.files.file.name;
    const path = __dirname + '/images/' + fileName;

    req.files.file.mv(path, (error) => {
        if (error) {
            console.error(error)
            res.writeHead(500, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({status: 'error', message: error}))
            return
        }

        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({status: 'success', path: '/img/houses/' + fileName}))
    })
})
app.listen(PORT)