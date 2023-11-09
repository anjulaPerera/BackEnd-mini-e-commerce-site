import * as mongoose from "mongoose";
import { Types } from "mongoose";
import { Type } from "typescript";

interface Common {
  sku?: number;
  quantity?: number;
  productName?: string;
  image?: string;
  productDescription?: string;
}

export interface DTournament extends Common {}

export interface ITournament extends Common, mongoose.Document {}
