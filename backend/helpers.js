const { MongoClient, ServerApiVersion } = require('mongodb');
const password = process.env['Password']
const uri = `mongodb+srv://VS:${password}@db.chcfz4a.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function updateData(uid, collectionName, data) {
  var result
  try {
    const database = client.db('DB'); // Replace with your database name
    const collection = database.collection(String(collectionName)); // Replace with your collection name

    const filter = { uid: uid }; // Filter to find the document(s) to update
    const update = { $set: data }; // Update to be applied (set age to 30)

    result = await collection.updateOne(filter, update);
  } catch (error) {
    console.error('Err ', error);
  }
  //await client.close();
  return result
}
async function createData(data, collectionName) {
  var result
  try {
    const database = client.db('DB');
    const collection = database.collection(String(collectionName));

    result = await collection.insertOne(data);
  } catch (error) {
    console.error('Err ', error);
  }
  //await client.close();
  return result;
}

async function findByUid(uid, collectionName) {
  var user
  try {
    
    const database = client.db("DB");
    const collection = database.collection(String(collectionName));

    const users = await collection.find({ uid: uid }).toArray();
    user = users[0]
  } catch (err) {
    console.error('Error:', err);
  }
  
  return user
}
async function findByCounty(county, collectionName) {
  var users
  try {
    
    const database = client.db("DB");
    const collection = database.collection(String(collectionName));
    console.log('county', county)
    users = await collection.find({ county: county }).toArray();
    console.log('results', users)
  } catch (err) {
    console.error('Error:', err);
  }
  
  return users
}
async function findByEmail(email, collectionName) {
  var user
  try {
    
    const database = client.db("DB");
    const collection = database.collection(String(collectionName));

    const users = await collection.find({ email: email }).toArray();
    user = users[0]
  } catch (err) {
    console.error('Error:', err);
  }
  
  return user
}

module.exports.createData = createData;
module.exports.updateData = updateData;
module.exports.findByUid = findByUid;
module.exports.findByEmail = findByEmail;
module.exports.findByCounty = findByCounty