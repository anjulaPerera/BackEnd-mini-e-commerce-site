
require("dotenv").config();
const app = require("express")();
import { NextFunction, Request, Response } from "express";
import { Authentication } from "./middleware/authentication";
import * as routes from "./routes";
import passportStartup from "./startup/passport";
passportStartup(app);
const cors = require("cors");


const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

app.use(cors());

var port = process.env.PORT || 6000;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/api/auth", Authentication.verifyToken);

routes.initRoutes(app);

app.use(function (req: Request, res: Response) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port, () => {
  console.log(`API server started on: ${port}`);
});
