const { MongoClient, ServerApiVersion } = require('mongodb')
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

const uri ="mongodb+srv://Nomad:ExploreLA123@clusternomad.l4pqavm.mongodb.net/?retryWrites=true&w=majority";

app.listen(PORT, () =>{
    console.log('Server is running!');
  })

async function main(){
    //create client object
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        await  listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        //ensures client will close when done
        await client.close();
    }
}

main().catch(console.error);

//function to list databases
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

