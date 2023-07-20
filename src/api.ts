import type { Client } from 'discord.js';
import express from 'express';


export function createAPI(client: Client) {
  const app = express();
  app.use(express.json());
  
  // REST endpoints here
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  return app;
}