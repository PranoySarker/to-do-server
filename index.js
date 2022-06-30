const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yy862.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const listCollection = client.db("todo-list").collection("lists");

        //POST todo
        app.post('/todo', async (req, res) => {
            const newTodo = req.body;
            const result = await listCollection.insertOne(newTodo);
            res.send(result);
        })
        //get todo
        app.get('/todos', async (req, res) => {
            const query = {}
            const cursor = listCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        console.log('database connected');
    }
    finally {
        // client.close();
    }
}
run().catch(console.dir);
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     // client.close();
//     console.log('connected to the database');
// });

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})