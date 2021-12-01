import superagent from 'superagent'

export const sendMessage = (recipientId, text) => {
    return superagent.post(`https://graph.facebook.com/v12.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`)
        .set({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
        .send({
            "messaging_type": "RESPONSE",
            "recipient": {
              "id": recipientId
            },
            "message": {
              "text": text
            }
        })
        .then(response => {
            console.log(process.env.PAGE_ACCESS_TOKEN)
            return console.log(response, "res")
        })
        .catch(err => console.log(process.env.PAGE_ACCESS_TOKEN, err, err.response.text))
}