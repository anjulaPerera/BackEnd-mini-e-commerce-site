import { Express, Request, Response } from "express";
import { initProductRoutes } from "./product";


export function initRoutes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.send("Well done!");
  });

  initProductRoutes(app);


  /* ALL INVALID REQUESTS */
  app.get("/", (req: Request, res: Response) => res.redirect(301, "/api/v1"));
}
