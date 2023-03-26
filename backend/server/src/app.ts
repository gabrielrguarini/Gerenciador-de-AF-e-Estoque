import { PrismaClient } from '@prisma/client'
const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});



const prisma = new PrismaClient()

async function criaNota() {
    const nota = await prisma.nota.create({
        data: {
            numero: '002/698',
            cidade: 'Espera Feliz',
        },
    })
  console.log(nota)
}

async function main() {
    const notas = await prisma.nota.findMany()
    console.log(notas)
  }
  
  main()
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