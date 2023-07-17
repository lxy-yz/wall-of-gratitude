/*
  Warnings:

  - Made the column `typeface` on table `gratitudes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bg` on table `gratitudes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fontSize` on table `gratitudes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "gratitudes" ALTER COLUMN "typeface" SET NOT NULL,
ALTER COLUMN "typeface" SET DEFAULT 'sans',
ALTER COLUMN "bg" SET NOT NULL,
ALTER COLUMN "bg" SET DEFAULT 'blue',
ALTER COLUMN "fontSize" SET NOT NULL,
ALTER COLUMN "fontSize" SET DEFAULT 'base';
