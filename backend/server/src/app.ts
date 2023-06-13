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


app.get("/notas", async (req, res) => {
  const notas = await getNotas().catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
  res.json(notas)
});

app.get("/produtos", async (req, res) => {
  const produtos = await getProdutos().catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
  res.json(produtos)
});

app.post("/", (req, res) => {
  criaNota(req.body)
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (error) => {
      console.error(error)
      await prisma.$disconnect()
      process.exit(1)
    })

  res.send(req.body)
})

const prisma = new PrismaClient()

async function getNotas() {
  try {
    const notas = await prisma.nota.findMany()
    return notas
  } catch (error) {
    console.error({ message: error })
  }
}
async function getProdutos() {
  try {
    const notas = await prisma.produto.findMany()
    return notas
  } catch (error) {
    console.error({ message: error })
  }
}


async function criaNota({ afNumber, cidade, listaProdutos }: notaInterface) {
  const notaCriada = await prisma.nota.create({ // Cria a nota e guarda ela em uma variavel.
    data: {
      afNumber: afNumber,
      cidade,
    }
  });



  for (const produto of listaProdutos) { // Cria cada produto por vez e connecta ele com a nota.
    try {
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
    } catch (error) {
      console.error({ message: error })
    }
  }
}





app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});