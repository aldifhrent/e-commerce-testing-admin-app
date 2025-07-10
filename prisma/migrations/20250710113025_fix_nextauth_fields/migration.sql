/*
  Warnings:

  - You are about to drop the column `accessToken` on the `accounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "accessToken",
ADD COLUMN     "access_token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");
