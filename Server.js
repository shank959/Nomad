const { MongoClient, ServerApiVersion } = require('mongodb')

async function main(){
    const uri ="mongodb+srv://Nomad:ExploreLA123@clusternomad.l4pqavm.mongodb.net/?retryWrites=true&w=majority";
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