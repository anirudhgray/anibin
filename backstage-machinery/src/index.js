import express from 'express'
import '../db/mongoose.js'
import pasteRouter from './routers/paste.js'

const app = express()
const port = process.env.port

app.use(express.json())
app.use(pasteRouter)

app.listen(port, () => {
  console.log("Server is up on port " + port)
})