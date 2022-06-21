import { AuthController, GameListController, ListPackController } from "./api";

import {
  ApiInfo,
  ApiServer,
  Context,
  controller,
  Get,
  HttpResponseOK,
} from "@foal/core";

@ApiInfo({
  title: "Application API",
  version: "1.0.0",
})
@ApiServer({
  url: "/api",
})
export class ApiController {
  subControllers = [
    controller("/game-list", GameListController),
    controller("/auth", AuthController),
    controller("/list-pack", ListPackController),
  ];

  @Get("/")
  index(ctx: Context) {
    return new HttpResponseOK("Hello world!");
  }
}
