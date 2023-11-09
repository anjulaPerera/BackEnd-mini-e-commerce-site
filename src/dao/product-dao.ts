import { Types } from "mongoose";
import { ApplicationError } from "../common/application-error";
import { DUser, IUser } from "../models/user-model";
import User from "../schemas/user-schema";
import { DProduct, IProduct } from "../models/product";
import Product from "../schemas/product-schema";

export namespace ProductDao {
  export async function doesProductExist(sku: string) {
    const userFound = await User.findOne({ sku: sku });
    return userFound;
  }

  export async function addNewProduct(data: DProduct): Promise<IProduct> {
    const saveProduct = new Product(data);
    let productSaved = await saveProduct.save();
    return productSaved;
  }

    export async function getAllProducts() {
    const userFound = await Product.find({
      quantity: {$gt: 0},
    })
    return userFound;
  }

  export async function getProductById(id: string) {
    const productFound = await Product.findById(id);
    return productFound;
  }

  export async function updateProductById(id: string, data: DProduct) {
    const productFound = await Product.findOneAndUpdate(
      { _id: Types.ObjectId(id) },
      { $set: data },
      { new: true }
    );
    return productFound;
  }


  export async function deleteProductById(id: string) {
    const productFound = await Product.findByIdAndDelete(id);
    return productFound;
  }

  export async function getFavoriteProducts() {
    const productFound = await Product.find({
      isFavorite: true,
    })
    return productFound;
  }
}
