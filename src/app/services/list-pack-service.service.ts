import { HttpResponseOK } from "@foal/core";
import { ListPackOfGame } from "../entities";

export class ListPackService {
  async get(gameSlug?: string) {
    let queryBuilder = ListPackOfGame.createQueryBuilder("gameList")
      .leftJoinAndSelect("gameList.creator", "creator")
      .leftJoinAndSelect("gameList.belongTo", "belongTo")
      .select([
        "gameList",
        "creator.fname",
        "belongTo.slug",
        "gameList.createdAt",
      ]);

    if (gameSlug) {
      queryBuilder = queryBuilder.where("belongTo.slug = :gameSlug", {
        gameSlug,
      });
    }

    const stories = await queryBuilder.getMany();

    return new HttpResponseOK(stories);
  }
}
