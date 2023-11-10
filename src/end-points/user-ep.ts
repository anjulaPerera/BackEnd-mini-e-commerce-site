import { NextFunction, Request, Response } from "express";
import {
  check,
  ValidationChain,
  validationResult,
} from "express-validator";
import { UserDao } from "../dao/user-dao";
import User from "../schemas/user-schema";

export namespace UserEp {
  export function authenticateWithEmailValidationRules(): ValidationChain[] {
    return [
      check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false })
      .withMessage("Invalid email address!"),
      check("password")
      .isString()
      .not()
      .isEmpty()
      .withMessage("Password is required!")
      .isLength({ min: 6, max: 40 })
      .withMessage(
        "Password must be at least 6 chars long & not more than 40 chars long!"
      )
      .not()
      .isIn(["123", "password", "god", "abc"])
      .withMessage("Do not use a common word as the password")
      .matches(/\d/)
      .withMessage("Password must contain a number!"),
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
        return res.status(400).json({message:"Input validation failed!"})
      }

      const email = req.body.email;
      const password = req.body.password;
      const remember = !!req.body.remember;


        let user: any = await User.findOne({ email: email });
        if (!user) {
          return res.status(404).json({message:"User not found!"})
        }

        UserDao.loginWithEmail(email, password, remember,user)
          .then((token: string) => {
            res.cookie("token", token, {
              httpOnly: true,
              secure: false,
              maxAge: 3600000 * 24 * 30,
            });

              return res.status(200).json({message:"Logged In!", data : {token: token}})
          })
          .catch(next);
    
    } catch (err) {
      return res.status(404).json({message:err})
    }
  }


 export async function getLoggedInUserDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
                    return res.status(200).json({message:"User found", data : {user: req.user}})

    } catch (err) {
            return res.status(404).json({message:"Something Went Wrong!!"})

    }
  }


}