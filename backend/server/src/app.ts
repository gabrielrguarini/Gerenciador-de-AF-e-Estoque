import { PrismaClient } from '@prisma/client'
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/", (req, res) => {
    console.log(res)
})

const prisma = new PrismaClient()

async function criaNota() {
    const nota = await prisma.nota.create({
        data: {
            numero: '003/698',
            cidade: 'Espera Feliz',
            produtos: {
              create:[
                {
                  custo:1000,
                  nome:"Processador",
                  quantidade:10,
                  status:"Nenhum"
                },
                {
                  custo:150,
                  nome:"Memoria",
                  quantidade:2,
                  status:"Nenhum"
                }
              ]
            }
        },
    })
}

  criaNota()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })



app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`);
});