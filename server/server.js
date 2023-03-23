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

/*assuming an express app is declared here*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT



app.use("/api/auth", authRouter)
app.use("/api/auth", todoRouter)


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