const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const password = process.env['Password']
const {createItem, updateItem, findItemByUid,  filterItemsByCounty}=require('./backend/itemController.js')
const {createPost, updatePost, findPostByUid, filterPostsByCounty}=require('./backend/postController.js')
const {createUser, updateUser, findUserByUid, findUserByEmail} = require('./backend/userController.js')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://VS:${password}@db.chcfz4a.mongodb.net/?retryWrites=true&w=majority`;
var bodyParser = require('body-parser');
var cors = require('cors')
app.use(cors())

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// Render Html File
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'templates/index.html'));
  req.on("close", function() {
    //client.close();
  });
});
app.get('/signup.js', function(req, res) {
res.sendFile(__dirname + '/templates/signup.js') //change this to your file path
})
app.get('/signup', function(req, res) {
  res.sendFile(path.join(__dirname, 'templates/signup.html'));
  req.on("close", function() {
    //client.close();
  });
});
app.get('/api/user/:uid', async function(req, res) {
  let user = await findUserByUid(req.params.uid)
  res.send(user);
})
app.get('/api/user/email/:email', async function(req, res) {
  let user = await findUserByEmail(req.params.email)
  res.send(user);
})
app.get('/api/item/:uid', async function(req, res) {
  let item = await findItemByUid(req.params.uid)
  res.send(item);
})
app.post('/api/item', async function(req, res) {
    let item = await createItem(req.body)
    res.send(item)
})
app.patch('/api/item/:uid', async function(req, res) {
    let item = await updateItem(req.params.uid, req.body)
    res.send(item)
})
app.get('/api/post/:uid', async function(req, res) {
  let item = await findPostByUid(req.params.uid)
  res.send(item);
})
app.get('/api/item/county/:county', async function(req, res) {
    let items = await filterItemsByCounty(req.params.county)
    res.send(items)
})
app.get('/api/post/county/:county', async function(req, res) {
    let posts = await filterPostsByCounty(req.params.county)
    res.send(posts)
})
app.post('/api/post', async function(req, res) {
    let item = await createPost(req.body)
    res.send(item)
})
app.patch('/api/post/:uid', async function(req, res) {
    let item = await updatePost(req.params.uid, req.body)
    res.send(item)
})

app.post('/api/user', async function(req, res) {
    let user = await createUser(req.body)
    console.log('user', user)
    res.send(user)
})

app.patch('/api/user/:uid', async function(req, res) {
    let user = await updateUser(req.params.uid, req.body)
    res.send(user)
})
app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, 'templates/login.html'));
  req.on("close", function() {
    //client.close();
  });
});

app.get('/images/:image', function(req, res) {
  image=req.params.image;
  res.sendFile(path.join(__dirname, `templates/images/${image}`));
  req.on("close", function() {
    //client.close();
  });
});

app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname, `templates/home.html`));
  req.on("close", function() {
    //client.close();
  });
});

app.get('/post', function(req, res) {
  res.sendFile(path.join(__dirname, `templates/post.html`));
  req.on("close", function() {
    //client.close();
  });
});

app.get('/sell', function(req, res) {
  res.sendFile(path.join(__dirname, `templates/sell.html`));
  req.on("close", function() {
    //client.close();
  });
});

app.listen(port, () => {
  // Code.....
})