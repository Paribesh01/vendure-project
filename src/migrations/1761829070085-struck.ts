import {MigrationInterface, QueryRunner} from "typeorm";

export class Struck1761829070085 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "customFieldsPricetiers"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "customFieldsPricetiers" jsonb`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "customFieldsPricetiers"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "customFieldsPricetiers" text`, undefined);
   }

}
