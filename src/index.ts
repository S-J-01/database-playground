import { Client } from 'pg'
import dotenv from 'dotenv'
dotenv.config()


 
// const pgClient = new Client({
//   host: process.env.HOST,
//   port: 5432,
//   database: process.env.DATABASE,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   ssl:true
// })

const pgClient = new Client(process.env.CONNECTION_STRING)

async function main(){
  await pgClient.connect()

  const response = await pgClient.query("SELECT * FROM users;")
  console.log(response.rows)
}

main()