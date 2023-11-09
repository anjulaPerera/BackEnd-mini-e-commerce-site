var mongoose = require("mongoose");
import Image from "./image-schema";

const productSchema = new mongoose.Schema({
  sku: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  // image: {
  //   type: Image,
  //   required: true,
  // },
  productDescription: {
    type: String,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    required: false,
  },

});

const Product = mongoose.model("Product", productSchema);
export default Product;
