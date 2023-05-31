/*
  Warnings:

  - The primary key for the `Nota` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Produto` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Nota" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numero" TEXT NOT NULL,
    "cidade" TEXT
);
INSERT INTO "new_Nota" ("cidade", "id", "numero") SELECT "cidade", "id", "numero" FROM "Nota";
DROP TABLE "Nota";
ALTER TABLE "new_Nota" RENAME TO "Nota";
CREATE TABLE "new_Produto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "custo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "notaId" TEXT NOT NULL,
    CONSTRAINT "Produto_notaId_fkey" FOREIGN KEY ("notaId") REFERENCES "Nota" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Produto" ("custo", "id", "nome", "notaId", "quantidade", "status") SELECT "custo", "id", "nome", "notaId", "quantidade", "status" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
