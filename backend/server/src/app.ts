import { PrismaClient } from '@prisma/client'
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

export interface produtosInterface {
  custo: string;
  name: string;
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
  const notaCriada = await prisma.nota.create({ // Cria a nota e guarda ela em uma variavel.
    data: {
      numero: afNumber,
      cidade,
    }
  });


  for (const produto of listaProdutos) { // Cria cada produto por vez e connecta ele com a nota.
    await prisma.produto.create({
      data: {
        custo: produto.custo,
        nome: produto.name,
        quantidade: produto.quantidade,
        status: produto.status,
        nota: {
          connect: {
            id: notaCriada.id
          }
        }
      }
    });
  }
}





app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});