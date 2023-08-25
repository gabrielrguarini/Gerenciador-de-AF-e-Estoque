-- CreateTable
CREATE TABLE "Nota" (
    "id" TEXT NOT NULL,
    "afNumber" TEXT NOT NULL,
    "cidade" TEXT,

    CONSTRAINT "Nota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "custo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "notaId" TEXT NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_notaId_fkey" FOREIGN KEY ("notaId") REFERENCES "Nota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
