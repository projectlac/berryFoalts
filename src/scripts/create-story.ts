import { createConnection } from "typeorm";
import { User, GameList } from "../app/entities";
import convertToSlug from "../utility/covertToSlug";

export const schema = {
  additionalProperties: false,
  properties: {
    author: { type: "string", format: "email", maxLength: 255 },
    title: { type: "string", maxLength: 255 },
  },
  required: ["author", "title"],
  type: "object",
};

export async function main(args: { author: string; title: string }) {
  const connection = await createConnection();

  const user = await User.findOneOrFail({ email: args.author });

  const story = new GameList();
  story.creator = user;
  story.title = args.title;
  story.slug = convertToSlug(args.title);
  story.createdAt = new Date();
  story.updatedAt = new Date();
  try {
    console.log(await story.save());
  } catch (error) {
    console.error(error);
  } finally {
    await connection.close();
  }
}
