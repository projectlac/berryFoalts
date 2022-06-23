import {
  Context,
  Delete,
  dependency,
  Get,
  HttpResponseNoContent,
  HttpResponseNotFound,
  Post,
  Put,
  ValidateBody,
  ValidatePathParam,
  ValidateQueryParam,
} from "@foal/core";
import { JWTRequired } from "@foal/jwt";
import { GameList, User } from "../../entities";
import { GameListService } from "../../services/game-list.service";

export class GameListController {
  @dependency
  SGameList: GameListService;

  @Get()
  @ValidateQueryParam("creatorId", { type: "string" }, { required: false })
  async readStories(ctx: Context) {
    const creatorId = ctx.request.query.creatorId;
    return this.SGameList.get(creatorId);
  }

  @Post()
  @ValidateBody({
    type: "object",
    properties: {
      title: { type: "string", maxLength: 255 },
    },
    require: ["title"],
    additionalProperties: false,
  })
  @JWTRequired()
  async createGame(ctx: Context) {
    return this.SGameList.create(ctx.request.body.title, ctx.user.id);
  }

  @Delete("/:gameId")
  @ValidatePathParam("gameId", { type: "string" })
  @JWTRequired()
  async deleteStory(ctx: Context<User>, { gameId }: { gameId: string }) {
    // Only retrieve stories whose author is the current user.
    const game = await GameList.findOne({ id: gameId, creator: ctx.user });

    if (!game) {
      return new HttpResponseNotFound();
    }

    await game.remove();

    return new HttpResponseNoContent();
  }

  @Put()
  @ValidateBody({
    type: "object",
    properties: {
      id: { type: "string" },
      title: { type: "string", maxLength: 255 },
    },
    require: ["title", "id"],
    additionalProperties: false,
  })
  @JWTRequired()
  async editGame(ctx: Context) {
    return this.SGameList.edit(ctx.request.body.id, ctx.request.body.title);
  }

  //Post new game l
}
