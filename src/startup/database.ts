const mongoose = require("mongoose");

mongoose.ObjectId.get((v: any) => (v ? v.toString() : v));

export default async function databaseSetup() {
  await mongoose.connect(getMongooseUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}

function getMongooseUri() {
  return process.env.NODE_ENV !== "test"
    ? process.env.DATABASE
    : process.env.TEST_MONGOOSE_URI;
}
