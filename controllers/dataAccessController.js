require('dotenv').config();
const {MongoClient} = require('mongodb');

// Get user accounts from MongoDb
get_users = async () =>{
  const uri = process.env.URI;
    const client = new MongoClient(uri);
    let result= null;
    try {
      await client.connect();
  
      result = await findAll(client,{
        db: 'TerritoryDB',
        collection: 'users',
      })
  
    } catch (e){
      console.error(e);
    } finally {
      await client.close();
    }
    return result;
}

// Get Territory Cards from MongoDb
load_data = async (req,res) =>{
    const uri = process.env.URI;
    const client = new MongoClient(uri);
    let result= null;
    try {
      await client.connect();
  
      result = await findAll(client,{
        db: 'TerritoryDB',
        collection: 'territories',
      })
  
    } catch (e){
      console.error(e);
    } finally {
      await client.close();
    }
    res.json(result);
  }

// Update Exsisting Territory Card
upload_data = async (req,res) => {
    const uri = process.env.URI;
    const client = new MongoClient(uri);
    
    try {
      await client.connect();
      result = await updateOneByTid(client,
        {
          db: 'TerritoryDB',
          collection: 'territories',
          tid: req.body.newTerritory.tid
        },
        req.body.newTerritory
      )
  
    } catch (e){
      console.error(e);
      console.log('unable to fetch data');
    } finally {
      await client.close();
    }
    res.send(req.body.newTerritory);
    res.end()
  }
  
  //------- Helpers -------
  
  //finds all documents 
  //findOneByName(client,{db,collection})
  async function findAll(client,target){
    const result = await client.db(target.db).collection(target.collection).find({},{projection:{ _id: 0 }}).toArray();
    return result; 
  }

  //update one document by name
  //updateOneByName(client,{db,collection,name},{<change to doc>}})
  async function updateOneByTid(client,target,newDoc){
    console.log(target.tid)
    const result = await client.db(target.db).collection(target.collection).updateOne({tid: target.tid},{$set: newDoc});
    console.log(`${result.matchedCount} document(s) matched the query criteria`);
    console.log(`${result.modifiedCount} were updated`)
  }

  
  module.exports = {
    upload_data: upload_data,
    load_data: load_data,
    get_users: get_users
  }