const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const image = require('./controllers/image');
const profile = require('./controllers/profile');
const register = require('./controllers/register');
const signin = require('./controllers/signin');

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 


// const db = knex({
//   // connect to your own database here:
//   client: 'pg',
//   connection: {
//     host : 'postgresql-regular-01105',
//     user : 'postgres',
//     password : '1234',
//     database : 'smart-brain'
//   }
// });

const db = knex({
  client:'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl:false,
  }
})


const app = express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", '*');
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//   next();
// });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


app.get('/', (req, res)=> { res.send(db.users) })

app.post('/signin', (req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req,res,db)})

app.put('/image', (req,res)=>{image.handleImage(req,res,db)});

app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)});



app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})
