// https://dev.to/mr_ali3n/folder-structure-for-nodejs-expressjs-project-435l
// TODO Admin htacces
// DID implement highscore
// TODO Make it https https://dev.to/fredabod/building-an-express-app-with-an-https-server-2mbj

let express = require("express")
const oApp = express()
let bodyParser = require('body-parser')
console.log("Server started at http://localhost:5005/")

// Add this line to parse incoming JSON payloads [says Bing]
oApp.use(express.json());

// METHODS FOR BROWSER
oApp.listen(5005)
//oApp.listen(8080)
oApp.use(express.static('public'));
// oApp.use(bodyParser.text({ type: 'text/plain' }))

// METHODS FOR READING
oApp.get("/", (aRequest, aResponse) =>
{
    console.log(__dirname)
    aResponse.sendFile("/index.html", { root: __dirname })
})

const fs = require('fs');
fs.readFile('./public/data/language.json', 'utf8', (error, data) =>
{
    console.log("readfile")
    if (error)
    {
        console.error(error);
        return;
    }
    console.log("Reading data succesfully!...")
});

oApp.get('/readfile', (aRequest, aResponse) =>
{
    console.log("/readfile get")
    fs.readFile('./public/data/language.json', 'utf8', (error, data) =>
    {
        if (error)
        {
            console.error(error);
            aResponse.status(500).send('Error reading file');
            return;
        }
        aResponse.send(data);
    });
});

// METHODS FOR WRITING
// with plain text
oApp.post("/hs", (aRequest, aResponse) =>
{
    console.log("Posting HS")
    let data = "";
    aRequest.on("data", (chunk) => {
        data += chunk;
    });
    aRequest.on("end", () => {
        console.log(data);
        console.log(typeof(data));
        writeHSToFile(data)
    });
})

// Note, tror jag gör en egen för highscore.
const writeHSToFile = (aText) =>
{
    console.log("writeToFile")
    let bText = '{"highscores":' + aText + '}'
    console.log(aText)
    let oFileStream = require("fs")
    oFileStream.writeFile("./public/data/highscore.json", bText, (error) =>
    {
        if (error)
        {
            aResponse.status(500).send('Error writing file');
            return console.error(aError)

        }
        console.log("Highscore Data written succesfully!...")
    })
}




oApp.post("/", (aRequest, aResponse) =>
{
    console.log("Posting")
    let data = "";
    aRequest.on("data", (chunk) => {
        data += chunk;
    });
    aRequest.on("end", () => {
        console.log(data);
        console.log(typeof(data));
        writeToFile(data)
    });
})
const writeToFile = (aText) =>
{
    console.log("writeToFile")
    let bText = '{"sentence":' + aText + '}'
    console.log(aText)
    let oFileStream = require("fs")
    oFileStream.writeFile("./public/data/language.json", bText, (error) =>
    {
        if (error)
        {
            aResponse.status(500).send('Error writing file');
            return console.error(aError)
        }
        console.log("Data written succesfully!...")
    })
}