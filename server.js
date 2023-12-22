//////////////////////////////////// IMPORTS // SETUP //////////////////////////////////////
import express from 'express';
const app = express();

import pg from 'pg';
const { Pool } = pg;

import 'dotenv/config';
const databaseURL = process.env.DATABASE_URL;

const db = new Pool({
    user: 'kylerlacer',
    database: 'rock_collection',
    password: '1234'
});
await db.connect();

/////////////////////////////////// REQUEST HANDLERS ///////////////////////////////////////
app.use(express.json());
app.use(express.static('public'));

app.get('/rocks', (req, res) => {
    db.query('SELECT * FROM rockChildren;')
    .then((result) => { res.status(200).json(result.rows); })
    .catch((error) => { res.status(404).send(error); })
})
app.get('/userInfo', (req, res) => {
    db.query('SELECT * FROM userInfo;')
    .then((result) => { res.status(200).json(result.rows); })
    .catch((error) => { res.status(404).send(error); })
})

app.post('/userInfo', (req, res) => {
    let { userName, password } = req.body;
    db.query('INSERT INTO userInfo (user_name, password) VALUES ($1, $2)', [userName, password])
    .then((result) => { res.status(201).send(result); })
    .catch((error) => { res.status(500).send(error); })
})

app.listen(8000, () => {
    console.log('Listening on Port 8000...')
})