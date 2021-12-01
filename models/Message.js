import Sequelize from 'sequelize'

const tableName = 'message'

const model = {
    created_at: Sequelize.DATE,
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true
    },
    recipient_id: Sequelize.STRING,
    sender_id: Sequelize.STRING,
    text: Sequelize.STRING,
}

const initModel = pool => {
    let definition = pool.define(tableName, model, { underscored: true })

    return definition
}

export default initModel
