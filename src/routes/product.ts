import { Express } from "express";
import { ProductEp } from "../end-points/product-ep";

export function initProductRoutes(app: Express) {
 app.post(
    "/api/auth/product/add",
    ProductEp.validateWithProductValidationRules(),
    ProductEp.addNewProduct
  );
 app.post(
    "/api/auth/product/update",
    ProductEp.validateWithProductValidationRules(),
    ProductEp.updateProductById
  );
 app.get(
    "/api/auth/product/all/view",
    ProductEp.getAllProducts
 );
     app.post(
    "/api/auth/product/favorite/add",
    ProductEp.validateWithProductValidationRules(),
    ProductEp.addFavoriteToProduct
  );
    

    
    

  
}
