import { config } from '../config.js'
import superagent from 'superagent'

export const sendMessage = (recipientId, text) => {
    const requestBody = JSON.stringify({
        "messaging_type": "RESPONSE",
        "recipient": {
          "id": recipientId
        },
        "message": {
          "text": text
        }
    })
    return superagent.post(`https://graph.facebook.com/v12.0/me/messages?access_token=${config.PAGE_ACCESS_TOKEN}`)
        .set({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
        .send(requestBody)
        .then(response => {
            return console.log(response.body, 'res')
        })
        .catch(err => console.log(config.PAGE_ACCESS_TOKEN, err, err.response.text))
}