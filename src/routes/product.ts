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

  
}
