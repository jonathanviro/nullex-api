-- CreateEnum
CREATE TYPE "RouteType" AS ENUM ('ROUTE_1', 'ROUTE_2', 'ROUTE_3', 'ROUTE_4');

-- CreateTable
CREATE TABLE "RouteMap" (
    "id" TEXT NOT NULL,
    "type" "RouteType" NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RouteMap_pkey" PRIMARY KEY ("id")
);
