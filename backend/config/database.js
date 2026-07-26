
// here i am gonna create a mysql connection pool
// how it works? what it'll be doing?
// a pool gets Mysql passwd verification, TCP handshake, and 
// TLS encryption when we first initialize it So when a user hits any req 
// to server then server will ask for a connection to jpool adn will get one
// and after performing tast/ query to DB server returns connection to pool

// it saves a few milisec of time and also saves CPU heavy work by doing {Mysql passwd verification, 
// TCP handshake, and TLS encryption } only once at initializeton time
// and we gives max connection limit adn it prevents DB server form gettting overloaded and crash

import 'dotenv/config';
import mysql from 'mysql2/promise';

// don't forget to export
export const pool = mysql.createPool({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWD,
   database: process.env.DB_NAME,
   port: process.env.DB_PORT,    // don't miss this hahaha
   waitForConnections: true,
   connectionLimit: 10,
   idleTimeout: 60000,           // colse the connection after 1min if not in use
});