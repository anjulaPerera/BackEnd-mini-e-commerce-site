import { Express } from "express";
import { UserEp } from "../end-points/user-ep";

export function initUserRoutes(app: Express) {
  /* PUBLIC ROUTES */
  app.post(
    "/api/public/login",
    UserEp.authenticateWithEmailValidationRules(),
    UserEp.authenticateWithEmail
  );
 app.get(
    "/api/auth/get/user",
    UserEp.getLoggedInUserDetails
  );



  
}
