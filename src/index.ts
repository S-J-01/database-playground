import express from 'express'
const app = express()
app.use(express.json())

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


   pgClient.connect()

 
   app.post('/signup', async (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    // const city = req.body.city
    // const country = req.body.country
    // const street = req.body.street
    // const pincode = req.body.pincode


   const insertQuery = `INSERT INTO users (username , email, password) VALUES($1, $2, $3)`

   const response = await pgClient.query(insertQuery,[username , email, password])

   console.log(response)
   res.json({
    message:"Signed up successfully"
   })

   } )

   app.listen(3000)

