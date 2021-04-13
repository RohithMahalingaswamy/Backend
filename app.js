const { default: axios } = require('axios');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const { response } = require('express');
app.use(bodyParser.urlencoded({ extended: false }));          
 app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/UkNews", function (req, res) {
    console.log("connected to UkNews")
    return axios.get("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=592f6b83b4ab4ec586baf7f9436206c3")
        .then(response => {
            console.log("responseeeee",response.data)
            res.status(202).send(response.data);
            //res.json({"status":200,"data":response.data});
            // res.send(response.data) // <= send data to the client
            //  res.send("Hello World!");

        })
        .catch(err => {
            console.log("errorhandler", err)
            res.send({ err }) // <= send error
        })

})



app.listen(8080, function () {
    console.log("server restared")
})
app.post("/filterKeyword", (req, res) => {
    var keyword=req.body.filter;
    console.log("welcome",keyword)

    axios.get(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=592f6b83b4ab4ec586baf7f9436206c3`)
    .then(response=>{
        res.status(202).send(response.data);

    })
    .catch(err => {
        console.log("errorpost", err)
        res.send({ err }) // <= send error
    })
})