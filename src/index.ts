import express from 'express';
import http from 'http';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
dotenv.config();

import routes from './routes';
import connectDB from './config/db';

const app = express();
connectDB();

app.use(cors({
  credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', routes());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080/")
});
