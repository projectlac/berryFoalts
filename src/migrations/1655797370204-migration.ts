import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1655797370204 implements MigrationInterface {
    name = 'migration1655797370204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "list_pack_of_game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" integer NOT NULL, "accumulate" integer NOT NULL, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "creatorId" uuid NOT NULL, "belongToId" uuid NOT NULL, CONSTRAINT "PK_a6ef699c8264ecae61658e83620" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "list_pack_of_game" ADD CONSTRAINT "FK_7f8b08f9fcb8f97ddff80675b04" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "list_pack_of_game" ADD CONSTRAINT "FK_10c91025ca35803360d3cda7672" FOREIGN KEY ("belongToId") REFERENCES "game_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list_pack_of_game" DROP CONSTRAINT "FK_10c91025ca35803360d3cda7672"`);
        await queryRunner.query(`ALTER TABLE "list_pack_of_game" DROP CONSTRAINT "FK_7f8b08f9fcb8f97ddff80675b04"`);
        await queryRunner.query(`DROP TABLE "list_pack_of_game"`);
    }

}
