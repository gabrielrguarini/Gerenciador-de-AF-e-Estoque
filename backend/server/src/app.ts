import { PrismaClient } from '@prisma/client'
import { VerificaToken } from './auth/VerificaToken'
const jwt = require('jsonwebtoken')
require('dotenv').config();
const bcrypt = require('bcryptjs');
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const CHAVE_SECRETA = process.env.CHAVE_SECRETA_JWT
const prisma = new PrismaClient()
export interface produtosInterface {
  custo: string;
  nome: string;
  quantidade: string;
  status: string
}

interface notaInterface {
  afNumber: string;
  cidade: string;
  produtos: produtosInterface[]
}

app.use(cors());
app.use(express.json());

app.post('/registro', async (req, res) => {
  const { user, password } = req.body
  try {
    const result = await postUser(user, password);
    if (result) {
      res.status(201).send("Usuário criado com sucesso.", result);
    }
    res.status(400).send("Usuário já existe.")
  } catch {
    res.status(500).send("Falha ao criar usuário.");
  }
})

app.post("/auth", async (req, res) => {
  const { id, user, password } = req.body
  const userInDb = await prisma.user.findFirst({
    where: {
      user
    }
  })
  if (!userInDb) {
    console.log("Usuário não existe")
    return { message: "usuário não existe" }
  }
  const passwordIsValid = await bcrypt.compareSync(password, userInDb.password)
  if (!passwordIsValid) {
    return res.status(401).send({ auth: false, token: null })
  }
  const token = jwt.sign({ id }, CHAVE_SECRETA, { expiresIn: 86400 })
  res.status(200).send({ auth: true, token })
})


app.get("/notas", VerificaToken, async (req, res) => {
  const notas = await getNotas().catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
  res.json(notas)
});
app.get("/notas/:notaId", VerificaToken, async (req, res) => {
  const nota = await getNota(req.params.notaId).catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
  res.json(nota)
});

app.get("/produtos", VerificaToken, async (req, res) => {
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


async function getNotas() {
  try {
    const notas = await prisma.nota.findMany()
    return notas
  } catch (error) {
    console.error({ message: error })
  }
}
async function getNota(id) {
  try {
    const nota = await prisma.nota.findUnique({
      where: {
        id
      },
      include: {
        produtos: true
      }

    })
    return nota
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

async function postUser(user: string, password: string) {
  try {
    const userInDb = await prisma.user.findFirst({
      where: {
        user: user
      }
    })
    if (userInDb) {
      return (false)
    }
    const hashedPassword = await bcrypt.hashSync(password, 8)
    const registraUsuario = await prisma.user.create({
      data: {
        user: user,
        password: hashedPassword
      }

    })
    console.log("userInDb:", userInDb)
    return registraUsuario
  } catch {
    console.log("Erro ao cadastrar usuário")
  }

  console.log("Erro ao cadastrar usuário")

}


async function criaNota({ afNumber, cidade, produtos }: notaInterface) {
  const notaCriada = await prisma.nota.create({ // Cria a nota e guarda ela em uma variavel.
    data: {
      afNumber: afNumber,
      cidade,
    }
  });

  for (const produto of produtos) { // Cria cada produto por vez e connecta ele com a nota.
    try {
      await prisma.produto.create({
        data: {
          custo: produto.custo,
          nome: produto.nome,
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