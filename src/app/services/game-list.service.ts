import { HttpResponseNotFound, HttpResponseOK } from "@foal/core";
import { GameList, User } from "../entities";

export class GameListService {
  async get(creatorId?: string) {
    let queryBuilder = GameList.createQueryBuilder("game")
      .leftJoinAndSelect("game.creator", "creator")
      .select([
        "game.id",
        "game.title",
        "game.slug",
        "creator.fname",
        "creator.lname",
        "game.createdAt",
      ]);

    if (creatorId) {
      queryBuilder = queryBuilder.where("creator.id = :creatorId", {
        creatorId,
      });
    }

    const stories = await queryBuilder.getMany();
    return new HttpResponseOK(stories);
  }

  async create(title: string, creator: User) {
    const data = GameList.create({
      title,
      creator,
    });
    await GameList.save(data);
    return new HttpResponseOK(data);
  }

  async edit(id: string, title: string) {
    const data = await GameList.findOne({ id });
    if (!data) return new HttpResponseNotFound();
    data.title = title;
    await GameList.update(id, data);
    return new HttpResponseOK();
  }
}
