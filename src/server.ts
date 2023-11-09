/// <reference path="global.d.ts" />
const app = require("express")();
import { Request, Response } from "express";

const cors = require("cors");
require("dotenv").config();

import bodyParser from "body-parser";
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


app.use(function (req: Request, res: Response) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port, () => {
  console.log(`API server started on: ${port}`);
});
