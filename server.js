const express = require('express')
const http = require('http');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
const jwt = require("jsonwebtoken");
const port = 3001;
const httpServer = http.createServer(app);

const salt = '123456';

function auth(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);
    const decode = jwt.decode(token);
    if (decode.user === 'admin') {
        next()
    } else {
        return res.sendStatus(403);
    }
}

app.use(bodyParser.json());
app.use(cors());

app.post('/token', (req, res) => {
    res.json({ token: jwt.sign({ user: 'admin' }, salt), type: 'ok' })
})

app.get('/gettoken', auth, (req, res) => {
    const token = req.headers['authorization'];
    const decode = jwt.decode(token);
    res.json({ token, decode })
})

app.use('/', express.static('build'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

httpServer.listen(port, () => console.log(`Server started on port ${port}`));