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
router.get('/api', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  res.send('cors problem fixed:)');
});
app.use(cors({origin: 'http://localhost:3001'}))
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error'))

app.use('/api', ParentRouter)
app.use('/api', ChildRouter)
app.use('/api', ChoreRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))