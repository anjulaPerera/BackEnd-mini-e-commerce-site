import { Express } from "express";
import { ProductEp } from "../end-points/product-ep";

export function initProductRoutes(app: Express) {
 app.post(
    "/api/auth/product/add",
    ProductEp.validateWithProductValidationRules(),
    ProductEp.addNewProduct
 );
   app.get(
    "/api/auth/product/all/view",
    ProductEp.getAllProducts
 );
 app.post(
    "/api/auth/product/update/:productId",
    ProductEp.validateWithProductValidationRules(),
    ProductEp.updateProductById
  );

     app.post(
    "/api/auth/product/favorite/add/:productId",
    ProductEp.validateWithProductValidationRules(),
    ProductEp.addFavoriteToProduct
  ); 
     app.post(
    "/api/auth/product/delete/:productId",
    ProductEp.deleteProductById
  ); 
     app.get(
    "/api/auth/product/get/fav-products",
    ProductEp.getFavoritedProducts
  ); 

}
