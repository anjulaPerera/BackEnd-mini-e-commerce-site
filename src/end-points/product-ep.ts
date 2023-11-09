import { check, ValidationChain, validationResult } from "express-validator";
import { Validations } from "../common/validation";
import { NextFunction, Request, Response } from "express";
import { ProductDao } from "../dao/product-dao";
import { DProduct } from "../models/product";

export namespace ProductEp {
  export function validateWithProductValidationRules(): ValidationChain[] {
    return [Validations.sku()];
  }

  export async function addNewProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.sendError(errors.array()[0]["msg"]);
      }

      const isProductFound = await ProductDao.doesProductExist(req.body.sku);
      if (isProductFound) {
        return res.sendError("Sorry This Product Already Exists");
      }

      const sku = req.body.sku;
      const quantity = req.body.quantity;
      const productName = req.body.productName;
      // const image = req.body.image;
      const productDescription = req.body.productDescription;

      const productData: DProduct = {
        sku: sku,
        quantity: quantity,
        productName: productName,
        // image: image,
        productDescription: productDescription,
      };

      const savedProduct = await ProductDao.addNewProduct(productData);
      if (!savedProduct) {
        return res.sendError("Registration failed");
      }

      return res.sendSuccess(savedProduct, "Product Added Successfully");
    } catch (error) {
      return res.sendError(error.message);
    }
  }

  export async function getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.sendError(errors.array()[0]["msg"]);
      }

      const allProducts = await ProductDao.getAllProducts();
      if (!allProducts) {
        return res.sendError("No Products Found");
      }

      return res.sendSuccess(allProducts, "All Products");
    } catch (error) {
      return res.sendError(error.message);
    }
  }
}
