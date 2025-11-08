import express from 'express';

const app = express()

const hostName = 'localhost'
const port = 8088

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>')
})

app.listen(port, hostName, () => {
    console.log(`Listening on http://${hostName}:${port}`)
})