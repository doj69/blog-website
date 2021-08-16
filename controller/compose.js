const Publish = require(`../model/compose`);

module.exports = {
  add: (obj) => {
    const item = new Publish({
      title: obj.title,
      content: obj.content,
    });
    item.save((err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(`Item ${obj.title} successfully to add`);
      }
    });
  },
  update: (id, obj) => {
    Publish.updateOne({ _id: id }, obj, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(`Item ${obj.title} successfully to update`);
      }
    });
  },
  delete: (id, obj) => {
    Publish.deleteOne({ _id: id }, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(`Item ${obj.title} successfully to delete`);
      }
    });
  },
  findAll: (callback) => {
    Publish.find({}, (err, items) => {
      if (err) {
        return callback(err.message);
      } else {
        return callback(items);
      }
    });
  },
  findById: (id, callback) => {
    Publish.findById({ _id: id }, (err, item) => {
      if (err) {
        return callback(err.message);
      } else {
        return callback(item);
      }
    });
  },
};
