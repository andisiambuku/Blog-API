import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBlogpostTable1691683893521 implements MigrationInterface {
    name = 'CreateBlogpostTable1691683893521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blogpost" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "body" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_3b62414e6a3029221a15c81884c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "blogpost" ADD CONSTRAINT "FK_21549bec09b49b89733a61d1253" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogpost" DROP CONSTRAINT "FK_21549bec09b49b89733a61d1253"`);
        await queryRunner.query(`DROP TABLE "blogpost"`);
    }

}
