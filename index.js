import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { verifyWebhook, interactWebhook } from './endpoint/webhook/webhook.js'

dotenv.config()
const port = process.env.PORT || 3001
const app = express()
const corsConfig = {
    credentials: true,
    origin: true,
}

app.use(bodyParser.json())
app.use(cors(corsConfig))

app.get('/', (req, res) => {
    res.send('hello world')
})

// endpoint for interacting with webhook
app.post('/webhook', interactWebhook)

// endpoint for verifying connection webhook
app.get('/webhook', verifyWebhook)

app.listen(port, () => console.log(`listening on port: ${port}`))
