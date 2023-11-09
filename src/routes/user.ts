import { Express } from "express";
import { UserEp } from "../end-points/user-ep";

export function initUserRoutes(app: Express) {
  app.post(
    "/api/public/login",
    UserEp.authenticateWithEmailValidationRules(),
    UserEp.authenticateWithEmail
  );


  
}
