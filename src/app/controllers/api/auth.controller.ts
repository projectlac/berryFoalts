import {
  Context,
  dependency,
  HttpResponseNoContent,
  Post,
  Session,
  ValidateBody,
} from "@foal/core";
import { JWTRequired } from "@foal/jwt";

import { User } from "../../entities";
import { AuthService } from "../../services";

const credentialsSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email", maxLength: 255 },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

export class AuthController {
  @dependency
  SAuth: AuthService;

  @Post("/login")
  @ValidateBody(credentialsSchema)
  async login(ctx: Context<User | undefined, Session>) {
    const { email, password } = ctx.request.body;
    return this.SAuth.login(email, password);
  }

  @Post("/signup")
  @ValidateBody({
    type: "object",
    properties: {
      email: { type: "string", format: "email", maxLength: 255 },
      password: { type: "string" },
      fname: { type: "string" },
      lname: { type: "string" },
    },
    required: ["email", "password"],
    additionalProperties: false,
  })
  async signup(ctx: Context<User | undefined, Session>) {
    const { email, password, lname, fname } = ctx.request.body;
    return this.SAuth.signUp(email, password, fname, lname);
  }

  @Post("/logout")
  async logout(ctx: Context<User | undefined, Session>) {
    await ctx.session.destroy();
    return new HttpResponseNoContent();
  }
  @Post("/checkToken")
  @JWTRequired()
  async checkUserToken(ctx: Context) {
    return this.SAuth.checkingUserToken(ctx.user.id);
  }
}
