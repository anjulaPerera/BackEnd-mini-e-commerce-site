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

  export async function updateProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.sendError(errors.array()[0]["msg"]);
      }

      const productId = req.params.id;

      const productFound = await ProductDao.getProductById(productId);

      const sku: any = req.body.sku ? req.body.sku : productFound?.sku;
      const quantity: any = req.body.quantity
        ? req.body.quantity
        : productFound?.quantity;
      const productName: any = req.body.productName
        ? req.body.productName
        : productFound?.productName;
      // const image: any = req.body.image ? req.body.image : productFound?.image;
      const productDescription: any = req.body.productDescription
        ? req.body.productDescription
        : productFound?.productDescription;

      const newProductData: DProduct = {
        sku: sku,
        quantity: quantity,
        productName: productName,
        // image: image,
        productDescription: productDescription,
      };

      const updateProduct = await ProductDao.updateProductById(
        productId,
        newProductData
      );

      if (!updateProduct) {
        return res.sendError(
          "Something Went Wrong. Could not update the password"
        );
      }
      res.sendSuccess(updateProduct, "Successfully updated!");
    } catch (error) {
      return res.sendError(error.message);
    }
  }
  export async function addFavoriteToProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.sendError(errors.array()[0]["msg"]);
      }

      const productId = req.params.id;

      const productFound = await ProductDao.getProductById(productId);

      const isFavorite: any = req.body.isFavorite

      const newProductData: DProduct = {
        isFavorite: isFavorite,
      };

      const updateProduct = await ProductDao.updateProductById(
        productId,
        newProductData
      );

      if (!updateProduct) {
        return res.sendError(
          "Something Went Wrong. Could not add favorite"
        );
      }
      res.sendSuccess(updateProduct, "Successfully added favorite!");
    } catch (error) {
      return res.sendError(error.message);
    }
  }
    
    export async function deleteProductById(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.sendError(errors.array()[0]["msg"]);
            }

            const productId = req.params.id;
           
            const updateProduct = await ProductDao.deleteProductById(
                productId
            );

            if (!updateProduct) {
                return res.sendError(
                    "Something Went Wrong. Could not delete the product"
                );
            }
            res.sendSuccess(updateProduct, "Successfully deleted!");
        } catch (error) {
            return res.sendError(error.message);
        }
    }

    export async function getFavoritedProducts( 
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.sendError(errors.array()[0]["msg"]);
            }

            const favProducts = await ProductDao.getFavoriteProducts();
            if (!favProducts) {
                return res.sendError("No Products Found");
            }

            return res.sendSuccess(favProducts, "All Products");
        } catch (error) {
            return res.sendError(error.message);
        }
    }
}
