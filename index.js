const exporess = require('express')
const app = exporess();

const cors = require('cors')
app.use(cors())
app.use(exporess.json())

const { MongoClient } = require('mongodb');
require('dotenv').config();

const ObjectId = require('mongodb').ObjectId;

const port = 5000


// URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ed7sj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


// Create Mongo CLient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connection to Sarver
async function run(){
    try{
        await client.connect()
        
        const database = client.db("carMechanic");
        const servicesCollection = database.collection("services");

        // Get all data
        app.get('/services',async(req,res)=>{
            const cursor = servicesCollection.find({})
            const services = await cursor.toArray();
            res.send(services)
        })

        // Get Single Service
        app.get('/services/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}

            const service = await servicesCollection.findOne(query);

            res.json(service);

        })


        // Post Api
        app.post('/services',async(req,res)=>{
            const service = req.body;
            console.log("Hit the post api",service);
            const result = await servicesCollection.insertOne(service);
            res.json(service)
        })

        //Update Api
        app.put('/services/:id',async(req,res)=>{
            const id = req.params.id;
            const filter  = {_id:ObjectId(id)}
            const options = { upsert: true };

            const updateDoc = {
                $set:{
                    name: req.body.name,
                    price: req.body.price
                },
            };
            const result = await servicesCollection.updateOne(filter, updateDoc, options);
            
            console.log(result);
            res.json(result);
        })
        

        // Delete api
        app.delete('/services/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}

            const result = await servicesCollection.deleteOne(query)

            res.json(result)
            console.log('Deleted');
        })

       


    }finally{
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/',async(req,res)=>{
    res.send("It's Working")
})

app.listen(port,()=>{
    console.log("Hitting on the port",port);
})