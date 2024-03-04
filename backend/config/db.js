const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect(
  `mongodb+srv://105vivek:vivek123@cluster0.pyovzeg.mongodb.net/mernapp`
);
module.exports = { connection };
