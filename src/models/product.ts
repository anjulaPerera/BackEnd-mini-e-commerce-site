import * as mongoose from "mongoose";
import { Types } from "mongoose";
import { Type } from "typescript";

interface Common {
  sku?: number;
  quantity?: number;
  productName?: string;
  // image?: string;
  productDescription?: string;
  isFavorite?: boolean;
}

export interface DProduct extends Common {}

export interface IProduct extends Common, mongoose.Document {}
