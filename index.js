const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const PORT = 3000;

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res, next) => {
    res.json({ info: 'Node.js, Express and Postgres API'});
});


app.get('/users', db.getUsers);

app.get('/users/:id', db.getUserById);

app.post('/users', db.createUser);

app.put('/users/:id', db.updateUser);

app.delete('/users/:id', db.deleteUser);





app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});