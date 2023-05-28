const { v4: uuidv4 } = require('uuid');
const { createData, updateData, findByUid, findByEmail} = require('./helpers.js')
//receives name, township, email
const createUser = async (data) => {
  var uid = uuidv4();
  data.uid = uid;
  await createData(data, "users")
  let item = findByUid(uid, "users")
  return item
}
const updateUser = async (uid, data) => {
  //typically data updates community
  let updated = await updateData(uid, "users", data)
  return updated
}
const findUserByUid = async (uid) => {
  let user = await findByUid(uid, 'users');
  return user
}
const findUserByEmail = async (email) => {
  let user = await findByEmail(email, 'users');
  return user
}
module.exports.findUserByUid = findUserByUid;
module.exports.createUser = createUser
module.exports.updateUser = updateUser
module.exports.findUserByEmail = findUserByEmail