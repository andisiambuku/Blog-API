import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBlogPostTable1691574687112 implements MigrationInterface {
    name = 'CreateBlogPostTable1691574687112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL, "userauthId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_076873d5ec97487772a4bf30fc9" FOREIGN KEY ("userauthId") REFERENCES "user_auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_076873d5ec97487772a4bf30fc9"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
