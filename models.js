import forEach from 'lodash/forEach.js'
import connectionPool from './connectionPool.js'
import Message from './models/Message.js'

const models = {
    Mesaage: Message(connectionPool)
}

forEach(models, model => {
    if (model.associate) {
        model.associate(models)
    }
})

export default models
