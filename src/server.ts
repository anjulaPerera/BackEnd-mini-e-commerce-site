/// <reference path="global.d.ts" />
const app = require("express")();
import { NextFunction, Request, Response } from "express";
const routes = require("./routes");
import { ResponseHandler } from "./middleware/response-handler";
const cors = require("cors");
require("dotenv").config();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

app.use(cors());

var port = process.env.PORT || 6000;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(ResponseHandler);
app.use("/api", () => { console.log("api")});

routes.initRoutes(app);

app.use(function (req: Request, res: Response) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port, () => {
  console.log(`API server started on: ${port}`);
});
