import {
  Context,
  dependency,
  Get,
  HttpResponseNotFound,
  HttpResponseOK,
  Post,
  UserRequired,
  ValidateBody,
  ValidateQueryParam,
} from "@foal/core";
import { JWTRequired } from "@foal/jwt";
import { GameList, ListPackOfGame } from "../../entities";
import { ListPackService } from "../../services";

export class ListPackController {
  @dependency
  SPackList: ListPackService;

  @Get()
  @ValidateQueryParam("gameSlug", { type: "string" }, { required: false })
  async readStories(ctx: Context) {
    return this.SPackList.get(ctx.request.query.gameSlug);
  }

  @Post()
  @JWTRequired()
  @UserRequired()
  @ValidateBody({
    type: "object",
    properties: {
      name: { type: "string", maxLength: 255 },
      slug: { type: "string", maxLength: 255 },
      accumulate: { type: "number" },
      price: { type: "number" },
    },
    require: ["name", "slug", "accumulate", "price"],
    additionalProperties: false,
  })
  async createGame(ctx: Context) {
    const { slug, ...newGameList } = ctx.request.body;

    const game = await GameList.findOne({ slug });

    if (!game) throw new HttpResponseNotFound();

    const data = ListPackOfGame.create({
      ...newGameList,
      belongTo: game.id,
      creator: ctx.user.id,
    });

    await ListPackOfGame.save(data);
    return new HttpResponseOK(data);
  }
}
