const express = require('express');
const db = require('./db/db')
const app = express()
const path = require("path");
const authRouter = require("./routes/auth")
const cookies = require('cookie-parser')
require("dotenv").config({
    path: path.resolve(__dirname, './db/.env')
});

app.use(cookies())

const bodyParser = require('body-parser');

/*assuming an express app is declared here*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT



app.use("/api/auth", authRouter)
app.use(express.json())

app.get('/', async (req, res)=> {
    const {username} = req.body
    res.send(username)
})


const start = async () => {
    try {
        await db
        app.listen(PORT, () => {
            console.log('Server started on port', PORT)
        })
    } catch (err) {

    }
}

start()