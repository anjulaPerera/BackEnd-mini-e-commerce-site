import * as express from "express";
import passport from "passport";
import { ExtractJwt } from "passport-jwt";
import User from "../schemas/user-schema";
require("dotenv").config();
import passportJWT from "passport-jwt";
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;

export default async function passportStartup(app: express.Application) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwtPayload: any, callback: any) => {
        try {
          const user = await User.findById(jwtPayload.user_id);
          return callback(null, user);
        } catch (ex) {
          return callback(ex);
        }
      }
    )
  );
}
