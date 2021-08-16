const mongoose = require("mongoose");
const publish = require(`../compose`);

// Database Name
const dbName = "blogdb";

//mongodb atlas url
const atlasurl = `mongodb+srv://admin-doju:GgJSPeKsYSB-c2z@todolist-cluster.kqr5h.mongodb.net/${dbName}`;
// Connection URL
const url = `mongodb://localhost:27017/${dbName}`;

// Connection Options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connection
mongoose.connect(atlasurl, options);

module.exports = {
  Publish: publish,
};
