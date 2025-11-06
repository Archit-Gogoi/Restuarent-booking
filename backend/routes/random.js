import express from "express";
const app = express()
import Redis from "ioredis";
const port = 3000

app.use(express.json());

const redis = new Redis();



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
