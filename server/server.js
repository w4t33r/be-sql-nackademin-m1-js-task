const express = require('express');
const db = require('./db/db')
const app = express()
const path = require("path");
const authRouter = require("./routes/auth")
const todoRouter = require('./routes/listRoute')
const cookie = require('cookie-parser')
const cors = require('./middleware/corsMiddleware')
require("dotenv").config({
    path: path.resolve(__dirname, './db/.env')
});

app.use(cors)
app.use(cookie())

const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.DB_PORT



app.use("/api/auth", authRouter)
app.use("/api/auth", todoRouter)


app.use(express.json())



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