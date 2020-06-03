const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./database')

const ParentRouter = require('./routes/parent.router')
const ChildRouter = require('./routes/child.router')
const ChoreRouter = require('./routes/chore.router')

const app = express();

require('dotenv').config();
const apiPort = process.env.PORT || 3001;

app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error'))

app.use('/api', ParentRouter)
app.use('/api', ChildRouter)
app.use('/api', ChoreRouter)

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))