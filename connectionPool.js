import { config } from './config.js'
import Sequelize from 'sequelize'

console.log(config, 'config')

const connectionPool = new Sequelize({
    host: config.host,
    database: config.database,
    username: config.username,
    password: config.password,
    dialect: 'mysql',
    logging: false,
    pool: {
        acquire: 20000,
        min: 1
    },
    operatorsAliases: false,
    define: {
        freezeTableName: true
    }
})

export default connectionPool
