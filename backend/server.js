require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes');
const DbConnect = require('./database')
const cors = require('cors');
const cookieParser = require('cookie-parser')


app.use(cookieParser());

const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000']
}
app.use(cors(corsOption));

app.use('/storage', express.static('storage'));

const PORT = process.env.PORT || 5500;

app.use(express.json({limit: '8mb'}));
app.use(router)

// Connect Database

DbConnect();


// Routes

app.get('/', (req, res) => {
    res.send('Hello from Express !');
});

// Listning Server

app.listen(PORT, () => {
    console.log(`Listining on  port ${PORT}`)
})