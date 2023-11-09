var mongoose = require("mongoose");


const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
      data: Buffer,
      contentType: String
  }

});

const Image = mongoose.model("Image", ImageSchema);
export default Image;
