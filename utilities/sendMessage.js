import dotenv from 'dotenv'
import superagent from 'superagent'

dotenv.config()

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
    return superagent.post(`https://graph.facebook.com/v12.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`)
        .set({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
        .send(requestBody)
        .then(response => {
            return console.log(response.body, 'res')
        })
        .catch(err => console.log(process.env.PAGE_ACCESS_TOKEN, err, err.response.text))
}