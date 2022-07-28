const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const res = require('express/lib/response');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile')

const db = knex({
    client: 'pg',
    connection: {
        host : 'postgresql-angular-23140',
        user : '',
        password : '',
        database : 'smart-brain'
    }
})
  

const app = express();
app.use(express.json());
app.use(cors())


app.get('/', (req,res) => {
    res.send('Succes')
})

app.post('/signin', (req, res) => {signin.handleSigin(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => profile.profileGet(req, res, db));

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.put('/image', (req, res) => image.handleImage(req, res, db));
app.post('/imageurl', (req, res) => image.handleAPICall(req, res, db));





app.listen(process.env.PORT || 3000, () =>{
    console.log(`app is running on port ${process.env.PORT}`)
})

