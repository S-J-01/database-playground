"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const process = require('process');
const client = new pg_1.Client({
    host: process.env.HOST,
    port: 5432,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
});
client.connect();
