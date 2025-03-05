import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 3020
import ConnectDB from './config/db.js'
import web from './routes/web.js'
import show from './routes/download.js'


ConnectDB()
app.use(express.static('public'));
app.use(express.json())

app.set('view engine','ejs')

app.use('/api/files',web)
app.use('/files',web)
app.use('/files/download',show)

app.listen(port,()=>{
    console.log(`Server is listening on :http://localhost:${port}`)
})