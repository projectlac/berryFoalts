import {
  hashPassword,
  HttpResponseInternalServerError,
  HttpResponseNotFound,
  HttpResponseOK,
  HttpResponseUnauthorized,
  verifyPassword,
} from "@foal/core";
import { User } from "../entities";
import { getSecretOrPrivateKey } from "@foal/jwt";
import { sign } from "jsonwebtoken";

export class AuthService {
  async checkingUserToken(id: string) {
    const user = await User.findOne({ id });
    if (!user) {
      return new HttpResponseNotFound();
    }

    const token = sign(
      { email: user.email, id: user.id },
      getSecretOrPrivateKey(),
      {
        expiresIn: "1h",
      }
    );

    return new HttpResponseOK({
      token,
      id: user.id,
      email: user.email,
      name: user.fname + user.lname,
    });
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      return new HttpResponseInternalServerError({
        err: "huhu",
        message: "An error occured.",
      });
    }
    if (!(await verifyPassword(password, user.password))) {
      return new HttpResponseUnauthorized();
    }

    const token = sign(
      { email: user.email, id: user.id },
      getSecretOrPrivateKey(),
      {
        expiresIn: "1h",
      }
    );

    return new HttpResponseOK({
      token,
      id: user.id,
      email: user.email,
      name: user.fname + user.lname,
    });
  }

  async signUp(
    email: string,
    password: string,
    fname: string | null,
    lname: string | null
  ) {
    const user = new User();
    user.email = email;
    user.avatar = "";
    user.fname = fname ?? "Unknown";
    user.lname = lname ?? "Unknown";

    user.password = await hashPassword(password);
    await user.save();

    const token = sign(
      { email: user.email, id: user.id },
      getSecretOrPrivateKey(),
      {
        expiresIn: "1h",
      }
    );

    return new HttpResponseOK({
      token,
      id: user.id,
      email: user.email,
      name: user.fname + user.lname,
    });
  }
}
