/*
  Warnings:

  - You are about to drop the column `Patrimonio` on the `RelacionamentoPA` table. All the data in the column will be lost.
  - Added the required column `PatrimonioMNT` to the `RelacionamentoPA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PatrimonioPC` to the `RelacionamentoPA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RelacionamentoPA" DROP COLUMN "Patrimonio",
ADD COLUMN     "PatrimonioMNT" TEXT NOT NULL,
ADD COLUMN     "PatrimonioPC" TEXT NOT NULL;
