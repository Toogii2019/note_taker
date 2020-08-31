var express = require("express");
var path = require("path");
var fs = require("fs");
const { Console } = require("console");

var noteArray = [];

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

const port = process.env.port;
app.listen(port, () => console.log(`Listening on port ${port}`));

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
    newData.push(req.body);
    fs.writeFileSync(path.join(__dirname, "/db/db.json"), JSON.stringify(newData));
    res.writeHead(200, { 'Content-Type': 'text/html' });
});

app.get("/api/notes", (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, "/db/db.json"),
            {encoding:'utf8', flag:'r'});
    console.log(data);
    res.send(data);
});


