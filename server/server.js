//REST API demo in Node.js
const express = require('express');
const app = express();
const PORT = 8080;

app.listen(
    PORT,
    () => console.log(`it's alive on "http://localhost:${PORT}`)
)

app.use( express.json() )

app.get('/getUser', (req, res) => {
    res.status(200).send({
        nickname: 'Chuck',
        age: '25'
    })
});

app.post('/nickname/:id', (req, res) => {
    const { id } = req.params;
    const { age } = req.body;

    if (!age) {
        res.status(418).send({ message: 'We need age!' })
    }

    res.send({
        nickname: `User with ${age} and ID of ${id}`,
    });

});