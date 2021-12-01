import Sequelize from 'sequelize'

const connectionPool = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
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
