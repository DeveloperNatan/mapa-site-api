/*
  Warnings:

  - Added the required column `Carteira` to the `LocalizacaoPA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LocalizacaoPA" ADD COLUMN     "Carteira" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RelacionamentoPA" ADD COLUMN     "localizacaoPAId" INTEGER;
