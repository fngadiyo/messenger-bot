import { PAGE_ACCESS_TOKEN } from '../config/fbToken.js'

export const sendMessage = (recipientId, text) => {
    return superagent.post(`https://graph.facebook.com/v12.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`)
        .type('application/json')
        .send({
            "messaging_type": "RESPONSE",
            "recipient": {
              "id": recipientId
            },
            "message": {
              "text": text
            }
        })
}