/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `RouteMap` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `RouteMap` table. All the data in the column will be lost.
  - Added the required column `imgRoute1` to the `RouteMap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgRoute2` to the `RouteMap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgRoute3` to the `RouteMap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgRoute4` to the `RouteMap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RouteMap" DROP COLUMN "imageUrl",
DROP COLUMN "type",
ADD COLUMN     "imgRoute1" TEXT NOT NULL,
ADD COLUMN     "imgRoute2" TEXT NOT NULL,
ADD COLUMN     "imgRoute3" TEXT NOT NULL,
ADD COLUMN     "imgRoute4" TEXT NOT NULL;

-- DropEnum
DROP TYPE "RouteType";
