import {
  Context,
  controller,
  Hook,
  HttpResponseNoContent,
  IAppController,
  Options,
} from "@foal/core";
import { createConnection } from "typeorm";

import { ApiController, OpenapiController } from "./controllers";

@Hook(() => (response: any) => {
  // Every response of this controller and its sub-controllers will be added this header.
  response.setHeader("Access-Control-Allow-Origin", "*");
})
export class AppController implements IAppController {
  subControllers = [
    controller("/api", ApiController),
    controller("/swagger", OpenapiController),
  ];

  @Options("*")
  options(ctx: Context) {
    const response = new HttpResponseNoContent();
    response.setHeader(
      "Access-Control-Allow-Methods",
      "HEAD, GET, POST, PUT, PATCH, DELETE"
    );
    response.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type,Authorization"
    );
    return response;
  }

  async init() {
    await createConnection();
  }
}
