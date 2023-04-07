import { PrismaClient } from '@prisma/client'
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

export interface produtosInterface {
  custo: string;
  nome: string;
  quantidade: string;
  status: "Nenhum" | "Comprar" | "Em Estoque";
}

interface notaInterface {
  afNumber: string;
  cidade: string;
  listaProdutos: produtosInterface[]
}

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  console.log(req.body)
  criaNota(req.body)
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })

  res.send(req.body)
})

const prisma = new PrismaClient()

async function criaNota({ afNumber, cidade, listaProdutos }: notaInterface) {

  const createNota = await prisma.nota.create({
    data: {
      numero: afNumber,
      cidade,
      produtos: {
        create: { ...listaProdutos }
      }
    }
  })
}





app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});