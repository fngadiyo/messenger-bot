import { config } from '../../config.js'
import moment from 'moment'
import includes from 'lodash/includes.js'
import forEach from 'lodash/forEach.js'
import isEmpty from 'lodash/isEmpty.js'
import map from 'lodash/map.js'
import { sendMessage } from '../../utilities/sendMessage.js'
import models from '../../models.js'


export const verifyWebhook = (req, res) => {
	let mode = req.query['hub.mode']
	let token = req.query['hub.verify_token']
	let challenge = req.query['hub.challenge']

	if (mode && token) {
		if (mode === 'subscribe' && token === config.VERIFY_TOKEN) {
			console.log('WEBHOOK_VERIFIED')
			res.status(200).send(challenge)
		
		} else {
			res.sendStatus(403)
		}
	}
}

export const interactWebhook = (req, res) => {
    const { Message } = models
	let body = req.body

	if (body.object === 'page') {
		forEach(body.entry, entry => {
			let webhook_event = entry.messaging[0]
			const receivedText = webhook_event.message.text
			const sender_id = webhook_event.sender.id
            const recipient_id = webhook_event.recipient.id
            let textToBeSent = 'sorry we can not process your message'

            return Message.findAll({
                where: {
                    sender_id
                }
            })
                .then((messages) => {
                    if (isEmpty(messages)) {
                        if (includes(receivedText, ['hi', 'hello'])) {
                            textToBeSent = 'Hi! Please tell me your name'
                            sendMessage(sender_id, textToBeSent)
                            return Message.create({
                                sender_id,
                                recipient_id,
                                text: receivedText
                            })
                        }
                        textToBeSent = `To start the conversation, please great me with 'hi' or 'hello'`
                        sendMessage(sender_id, textToBeSent)
                    }
                    const messagesResult = map(messages, message => message.get({ plain: true }))
                    const messageTexts = map(messagesResult, message => message.text)
                    const lastResult = messagesResult[messagesResult.length - 1]
                    const lastMessage = messageTexts[messageTexts.length - 1]
                    
                    if (
                        messageTexts.length === 1
                        && (!includes(['yes', 'yeah', 'yup', 'cool', 'ya', 'yea'], receivedText) && !includes(['no', 'nah', 'nope'], receivedText))
                    ) {
                        textToBeSent = `Hi ${text} please tell me your birthday with YYYY-MM-DD format. ex: 1992-10-12`
                    }

                    if (
                        messageTexts.length >= 2
                        && (!includes(['yes', 'yeah', 'yup', 'cool', 'ya', 'yea'], receivedText) && !includes(['no', 'nah', 'nope'], receivedText))
                    ) {
                        textToBeSent = 'Cool! Do you want to know how many days until your birthday?'
                    }

                    if (includes(['yes', 'yeah', 'yup', 'cool', 'ya', 'yea'], receivedText)) {
                        const birthdayDate = moment(lastMessage, 'YYYY-MM-DD', true)

                        if (!birthdayDate.isValid()) {
                            textToBeSent = 'sorry you typed wrong birthday, please tell me your birthday again with YYYY-MM-DD format. ex: 1992-10-12'
                            sendMessage(sender_id, textToBeSent)
                            return Message.destroy({ // destroy invalid date
                                where: {
                                    id: lastResult.id
                                }
                            })
                        }

                        const today = moment.utc()
                        const daysUntilBirthday = today.diff(birthdayDate, 'days')
                        textToBeSent = `There are ${daysUntilBirthday} days left until your next birthday`
                    }

                    if (includes(['no', 'nah', 'nope'], receivedText)) {
                        textToBeSent = 'okay, goodbye then!'

                    }
                    
                    sendMessage(sender_id, textToBeSent)
                    
                    return Message.create({
                        sender_id,
                        recipient_id,
                        text: receivedText
                    })
                })
                .catch((err) => {
                    console.log(err)
                    return Promise.reject({
                        status: 500,
                        message: 'Internal Server Error'
                    })
                })
		})

		res.status(200).send('EVENT_RECEIVED')
	} else {
		res.sendStatus(404)
	}
}