import passport from "passport";
import { NextFunction, Request, Response } from "express";

export class Authentication {
  public static verifyToken(req: Request, res: Response, next: NextFunction) {
        console.log('Token from request:', req.headers.authorization);

    return passport.authenticate(
      'jwt',
      { session: false },
      (err: any, user: any, info: any) => {
        if (err || !user) {
          console.log(`Login Failed. reason: ${info}`);
          return res.status(404).json({ message: info });
        }

        req.user = user;
        req.body.user = user._id;

        // Log the verified JWT payload
        console.log("Verified JWT payload:", user);

        console.log("verify token==>",req.user);
        return next();
      }
    )(req, res, next);
  }
}


