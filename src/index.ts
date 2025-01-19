import express from "express";
const app = express();
app.use(express.json());

import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

// const pgClient = new Client({
//   host: process.env.HOST,
//   port: 5432,
//   database: process.env.DATABASE,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   ssl:true
// })

const pgClient = new Client(process.env.CONNECTION_STRING);

pgClient.connect();

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const city = req.body.city;
  const country = req.body.country;
  const street = req.body.street;
  const pincode = req.body.pincode;

  const insertQuery = `INSERT INTO users (username , email, password) VALUES($1, $2, $3) RETURNING id`;

  const insertAddressQuery = `INSERT INTO addresses (city, country, street, pincode , user_id) VALUES($1, $2, $3, $4, $5)`;

  pgClient.query(`BEGIN;`);

  const response = await pgClient.query(insertQuery, [
    username,
    email,
    password,
  ]);

  const userId = response.rows[0].id;

  const responseAddressQuery = await pgClient.query(insertAddressQuery, [
    city,
    country,
    street,
    pincode,
    userId,
  ]);

  pgClient.query(`COMMIT;`);

  console.log(response);
  res.json({
    message: "Signed up successfully",
  });
});

app.get("/metadata", async (req, res) => {
  const userid = req.query.id;

  const query1 = `SELECT users.id, users.username, users.email, addresses.city, addresses.country, addresses.street, addresses.pincode
  FROM users JOIN addresses ON users.id = addresses.user_id
  WHERE users.id = $1;`;

  const response = await pgClient.query(query1, [userid]);

  res.json({
    message: response.rows,
  });
});

app.listen(3000);
