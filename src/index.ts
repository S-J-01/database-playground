import { Client } from 'pg'
const process = require('process');

 
const client = new Client({
  host: process.env.HOST,
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
})

client.connect()