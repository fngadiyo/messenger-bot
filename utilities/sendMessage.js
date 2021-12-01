import superagent from 'superagent'

export const sendMessage = (recipientId, text) => {
    console.log(recipientId, text)
    const requestBody = JSON.stringify({
        "messaging_type": "RESPONSE",
        "recipient": {
          "id": recipientId
        },
        "message": {
          "text": text
        }
    })
    console.log(requestBody, 'reqBody')
    return superagent.post(`https://graph.facebook.com/v12.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`)
        .set({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
        .send(requestBody)
        .then(response => {
            console.log(process.env.PAGE_ACCESS_TOKEN)
            return console.log(response, "res")
        })
        .catch(err => console.log(process.env.PAGE_ACCESS_TOKEN, err, err.response.text))
}