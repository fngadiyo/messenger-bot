import express from 'express'
import cors from 'cors'

const port = process.env.PORT || 3001
const app = express()

const corsConfig = {
    credentials: true,
    origin: true,
}

app.use(cors(corsConfig))

app.get('/', (req, res) => {
    res.send('helloworld')
})

app.listen(port, () => console.log(`listening on port: ${port}`))
