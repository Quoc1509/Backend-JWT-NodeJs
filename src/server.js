import express from 'express'
import configViewEngine from './config/viewEngine'
import initWebRoutes from './routes/web'
import bodyparser from 'body-parser'

require("dotenv").config();

const app = express();


//config view engine
configViewEngine(app)

//config body-parse
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

//config web routes
initWebRoutes(app)


const PORT = process.env.PORT || 8080
app.listen(PORT, ()=> {
    console.log(">>> Backend is running on the port: " + PORT)
})