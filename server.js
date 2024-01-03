//////////////////////////////////// IMPORTS // SETUP //////////////////////////////////////
import express from 'express';
const app = express();

import pg from 'pg';
const { Pool } = pg;

import 'dotenv/config';
const databaseURL = process.env.DATABASE_URL;

const db = new Pool({
    connectionString: databaseURL,
});
await db.connect();

/////////////////////////////////// REQUEST HANDLERS ///////////////////////////////////////
/////////// GET ///////////
app.use(express.json());
app.use(express.static('public'));

app.get('/rocks', (req, res) => {
    db.query('SELECT * FROM rockChildren;')
    .then((result) => { res.status(200).json(result.rows); })
    .catch((error) => { res.status(404).send(error); })
})
app.get('/rocks/:id', (req, res) => {
    let id = req.params.id;
    db.query('SELECT * FROM rockChildren WHERE id = $1;', [id])
    .then((result) => { res.status(200).json(result.rows[0]); })
    .catch((error) => { res.status(404).send(error); })
})
app.get('/userInfo', (req, res) => {
    db.query('SELECT * FROM userInfo;')
    .then((result) => { res.status(200).json(result.rows); })
    .catch((error) => { res.status(404).send(error); })
})
app.get('/userInfo/:id', (req, res) => {
    let id = req.params.id;
    db.query('SELECT * FROM rockChildren WHERE user_id = $1', [id])
    .then((result) => { res.status(200).json(result.rows); })
    .catch((error) => { res.status(404).send(error); })
})

/////////// POST ///////////
app.post('/userInfo', (req, res) => {
    let { userName, password } = req.body;
    db.query('INSERT INTO userInfo (user_name, password) VALUES ($1, $2)', [userName, password])
    .then((result) => { res.status(201).send(result); })
    .catch((error) => { res.status(500).send(error); })
})

////////// PATCH //////////
app.patch('/rocks/:id', (req, res) => {
    let id = req.params.id;
    let { user } = req.body;
    db.query('UPDATE rockChildren SET user_id = $1 WHERE id = $2;', [user, id])
    .then((result) => { res.status(201).send(`Pet Adopted!`); })
    .catch((error) => { res.status(500).send(error); })
})

///////// DELETE /////////
app.delete('/rocks/:name', (req, res) => {
    let name = req.params.name;
    db.query('DELETE FROM rockChildren WHERE first_name = $1;', [name])
    .then((result) => { res.status(200).send('Rock Smashed'); })
    .catch((error) => { res.status(500).send('Did not happen...'); })
})

//-------------------------------------------------------------------------------------//
app.listen(10000, () => {
    console.log('Listening on Port 10000...')
})