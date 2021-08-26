const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/FactoryDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify : false
});
