import { config } from './config.js'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes.js'
import { verifyWebhook, interactWebhook } from './endpoint/webhook/webhook.js'

const port = 3001
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

app.use('/api', routes)

app.listen(port, () => console.log(`listening on port: ${port}`))
