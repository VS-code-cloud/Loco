const { v4: uuidv4 } = require('uuid');
const { createData, updateData, findByUid, findByCounty }=require('./helpers.js')
//createPost receives title and description, plus authoruid and county
const createPost = async (data) => {
  var uid = uuidv4();
  data.uid = uid
  data.timestamp = new Date()
  let post = await createData(data, "posts")
  return post
}
const updatePost = async (uid, data) => {
  //typically data updates community
  let updated = await updateData(uid, "posts", data)
  return updated
}
const findPostByUid = async (uid) => {
  let post = await findByUid(uid, 'posts');
  return post
}
const filterPostsByCounty = async (county) => {
  let posts = findByCounty(county, 'posts')
  return posts;
}
module.exports.filterPostsByCounty = filterPostsByCounty
module.exports.createPost = createPost;
module.exports.updatePost = updatePost;
module.exports.findPostByUid = findPostByUid;