const mongoose = require('mongoose');
const db = process.env.DB_URI

async function connectDB() {
    try {
      await mongoose.connect("mongodb+srv://nodeapp:nodeapp@cluster0.fk9c5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected");
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  module.exports = connectDB;

// mongoose.connect(db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => {
//     console.log(`connection successful`);
// }).catch((e) => {
//     console.log(`Error:`,e);
// });