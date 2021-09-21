const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const image = require('./controllers/image');
const profile = require('./controllers/profile');
const register = require('./controllers/register');
const signin = require('./controllers/signin');

const db = knex({
  
  client: 'pg',
  connection: {
    host : 'postgresql-flat-21429',
    user : 'postgres',
    password : '1234',
    database : 'smart-brain'
  }
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get('/', (req, res)=> { res.send(db.users) })

app.post('/signin', (req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req,res,db)})

app.put('/image', (req,res)=>{image.handleImage(req,res,db)});

app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)});


const PORT = process.env.PORT;
app.listen(PORT, ()=> {
  console.log(`app is running on port ${PORT}`);
})
