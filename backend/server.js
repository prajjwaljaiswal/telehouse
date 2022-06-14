require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes');
const DbConnect = require('./database')
const cors = require('cors');


const corsOption = {
    origin: ['http://localhost:3000']
}
app.use(cors(corsOption));

const PORT = process.env.PORT || 5500;

app.use(express.json());
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