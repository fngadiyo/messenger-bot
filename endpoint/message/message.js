import map from 'lodash/map.js'
import formatAndSendResponse from '../../utilities/formatAndSendResponse.js'

const user = {
    getMessage: models => (req, res) => {
        const { Message } = models
        const { id } = req.query
        const resultPromise = Message.findOne({
            where: { id }
        }).then((message) => {
            if (!message) return null
            
            const messageResult = user.get({ plain: true })
            return { message: messageResult }
        })
        .catch((err) => {
            console.log(err)
            return Promise.reject({
                status: 500,
                message: 'Internal Server Error'
            })
        })
    
        formatAndSendResponse(res, resultPromise)
    },
    getMessages: models => (req, res) => {
        const { Message } = models
        const resultPromise = Message.findAll()
            .then(messages => {
                return { messages: map(messages, message => message.get({ plain: true })) }
            })
            .catch((err) => {
                console.log(err)
                return Promise.reject({
                    status: 500,
                    message: 'Internal Server Error'
                })
            })
    
        formatAndSendResponse(res, resultPromise)
    },
    deleteMessage: models => (req, res) => {
        const { Message } = models
        const { id } = req.query
        const resultPromise = Message.destroy({
            where: { id }
        })
        .catch((err) => {
            console.log(err)
            return Promise.reject({
                status: 500,
                message: 'Internal Server Error'
            })
        })
    
        formatAndSendResponse(res, resultPromise)
    },
}

export default user