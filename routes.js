import express from 'express'
import models from './models.js'
import message from './endpoint/message/message.js'

const router = express.Router()

router.route('/message').get(message.getMessage(models))
router.route('/messages').get(message.getMessages(models))
router.route('/message/delete').post(message.deleteMessage(models))

export default router
