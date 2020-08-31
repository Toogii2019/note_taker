var express = require("express");
var path = require("path");
var fs = require("fs");
const { Console } = require("console");

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${PportRT}`));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.post("/api/notes", (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, "/db/db.json"),
            {encoding:'utf8', flag:'r'});

    var newData = JSON.parse(data);
    if (newData.length === 0) {
        req.body.id = 0;
        newData = [];
    }
    else {
        req.body.id = newData[newData.length-1].id + 1;
    }
    newData.push(req.body);
    fs.writeFileSync(path.join(__dirname, "/db/db.json"), JSON.stringify(newData));
    res.status(200).send('Ok')
});

app.get("/api/notes", (req, res) => {

    // Create directory and file if doesn't exist
    if (!fs.existsSync(path.join(__dirname, "/db/db.json"))) {
        console.log("The file db.json doesn't exist. Creating...");
        fs.writeFileSync(path.join(__dirname, "/db/db.json"), "[]");
    }
    const data = fs.readFileSync(path.join(__dirname, "/db/db.json"),
            {encoding:'utf8', flag:'r'});
    res.send(data);
});

app.delete("/api/notes/:id", (req, res) => {
    const datas = fs.readFileSync(path.join(__dirname, "/db/db.json"),
            {encoding:'utf8', flag:'r'});
    let parsedData = JSON.parse(datas);
    let newData = [];
    parsedData.forEach(data => {
        if (data.id != req.params.id) {
            newData.push(data);
        }
    })
    writeData(newData);
    res.status(200).send('Ok')
});

function writeData(data) {
    fs.writeFileSync(path.join(__dirname, "/db/db.json"), JSON.stringify(data));
}
