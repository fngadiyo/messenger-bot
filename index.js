import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { VERIFY_TOKEN } from './config/fbToken.js'
import { sendMessage } from './utilities/sendMessage.js'

const port = process.env.PORT || 3001
const app = express()
const corsConfig = {
    credentials: true,
    origin: true,
}

app.use(bodyParser.json())
app.use(cors(corsConfig))

app.get('/', (req, res) => {
    res.send('helloworld')
})

// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {
	let body = req.body;
	console.log(body)

	// Checks this is an event from a page subscription
	if (body.object === 'page') {

		// Iterates over each entry - there may be multiple if batched
		body.entry.forEach(function(entry) {

			// Gets the message. entry.messaging is an array, but 
			// will only ever contain one message, so we get index 0
			let webhook_event = entry.messaging[0]
			console.log(webhook_event)
			const receivedText = webhook_event.message.text
			const recipientId = webhook_event.recipientId
			console.log(receivedText, recipientId, receivedText.includes('hi'))
			if (receivedText.includes('hi')) {
				const textToBeSent = 'please tell me your name'
				sendMessage(recipientId, textToBeSent)
			}
		})

		// Returns a '200 OK' response to all requests
		res.status(200).send('EVENT_RECEIVED')
	} else {
		// Returns a '404 Not Found' if event is not from a page subscription
		res.sendStatus(404)
	}
})

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {
      
	// Parse the query params
	let mode = req.query['hub.mode']
	let token = req.query['hub.verify_token']
	let challenge = req.query['hub.challenge']
		
	// Checks if a token and mode is in the query string of the request
	if (mode && token) {

		// Checks the mode and token sent is correct
		if (mode === 'subscribe' && token === VERIFY_TOKEN) {
		
		// Responds with the challenge token from the request
		console.log('WEBHOOK_VERIFIED')
		res.status(200).send(challenge)
		
		} else {
		// Responds with '403 Forbidden' if verify tokens do not match
		res.sendStatus(403) 
		}
	}
})

app.listen(port, () => console.log(`listening on port: ${port}`))
