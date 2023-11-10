import User from "../schemas/user-schema";

export namespace UserDao {
  export async function doesUserExist(email: string) {
    const userFound = await User.findOne({ email: email });
    return userFound;
  }

  export async function loginWithEmail(
    email: string,
    password: string,
    remember: boolean,
    user: any
  ): Promise<any> {
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      var tokenString = await user.createAccessToken(
        remember ? "365 days" : "24 hours"
      );

      return {
        token: tokenString,
      };
    } else {
      throw new Error("Incorrect email/password combination!");
    }
  }


}
