// 3p
import { hashPassword } from "@foal/core";
import { createConnection, getConnection } from "typeorm";

// App
import { User } from "../app/entities";

export const schema = {
  additionalProperties: false,
  properties: {
    email: { type: "string", format: "email", maxLength: 255 },
    password: { type: "string" },
    fname: { type: "string", maxLength: 255 },
    lname: { type: "string", maxLength: 255 },
  },
  required: ["email", "password"],
  type: "object",
};

export async function main(args: {
  email: string;
  password: string;
  fname?: string;
  lname?: string;
}) {
  const user = new User();
  user.email = args.email;
  user.password = await hashPassword(args.password);
  user.fname = args.fname ?? "Unknown";
  user.lname = args.lname ?? "Unknown";
  user.avatar = "";
  user.createdAt = new Date();
  user.updatedAt = new Date();

  await createConnection();

  try {
    console.log(await user.save());
  } catch (error: any) {
    console.log(error.message);
  } finally {
    await getConnection().close();
  }
}
