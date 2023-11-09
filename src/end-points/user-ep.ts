
import { NextFunction, Request, Response } from "express";
import {
  check,
  ValidationChain,
  validationResult,
} from "express-validator";

import LoginMethod from "../enums/LoginMethod";
import User from "../schemas/user-schema";
import { UserDao } from "../dao/user-dao";
import { Validations } from "../common/validation";

export namespace UserEp {
  export function authenticateWithEmailValidationRules(): ValidationChain[] {
    return [
      Validations.email(),
      Validations.password(),
      check("loginMethod")
        .notEmpty()
        .withMessage("loginMethod is required")
        .isString()
        .withMessage("loginMethod is not a String")
        .isIn([LoginMethod.EMAIL])
        .withMessage("loginMethod is not valid type"),
      check("remember")
        .notEmpty()
        .withMessage("remember is required")
        .isString()
        .withMessage("remember is not a String")
        .isIn(["TRUE", "FALSE"])
        .withMessage("remember is not valid type"),
    ];
  }


  export async function authenticateWithEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.sendError(errors.array()[0]["msg"]);
      }

      const email = req.body.email;
      const password = req.body.password;
      const loginMethod = req.body.loginMethod;
      const remember = !!req.body.remember;

      if (loginMethod == LoginMethod.EMAIL) {
        let user: any = await User.findOne({ email: email });
        if (!user) {
          return res.sendError("User Not Found in the System");
        }

        UserDao.loginWithEmail(email, password, loginMethod, remember, user)
          .then((token: string) => {
            res.cookie("token", token, {
              httpOnly: true,
              secure: false,
              maxAge: 3600000 * 24 * 30,
            });

            res.sendSuccess(token, "Successfully Logged In645!");
          })
          .catch(next);
      } else {
        return res.sendError("Not A Valid login Method");
      }
    } catch (err) {
      return res.sendError(err);
    }
  }


}