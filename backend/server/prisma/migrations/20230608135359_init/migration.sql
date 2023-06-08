-- CreateTable
CREATE TABLE "Nota" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "afNumber" TEXT NOT NULL,
    "cidade" TEXT
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "custo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "notaId" TEXT NOT NULL,
    CONSTRAINT "Produto_notaId_fkey" FOREIGN KEY ("notaId") REFERENCES "Nota" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
