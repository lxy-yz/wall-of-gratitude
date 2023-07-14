/*
  Warnings:

  - You are about to drop the column `left` on the `gratitudes` table. All the data in the column will be lost.
  - You are about to drop the column `top` on the `gratitudes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gratitudes" DROP COLUMN "left",
DROP COLUMN "top",
ADD COLUMN     "fromPosition" INTEGER[],
ADD COLUMN     "toPosition" INTEGER[];
