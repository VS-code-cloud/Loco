const { v4: uuidv4 } = require('uuid');
const { createData, updateData, findByUid, findByCounty}=require('./helpers.js')
//createItem receives name, poster, county, description
const createItem = async (data) => {
  var uid = uuidv4();
  data.uid = uid
  data.timestamp = new Date()
  let item = await createData(data, "items")
  return item
}
const updateItem = async (uid, data) => {
  //typically data updates community
  let updated = await updateData(uid, "items", data)
  return updated
}
const findItemByUid = async (uid) => {
  let item = await findByUid(uid, 'items');
  return item
}
const filterItemsByCounty = async (county) => {
  let items = findByCounty(county, 'items')
  return items;
}
module.exports.filterItemsByCounty = filterItemsByCounty
module.exports.createItem = createItem;
module.exports.updateItem = updateItem;
module.exports.findItemByUid = findItemByUid;
