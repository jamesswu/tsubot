import type { Client } from 'discord.js';
import express from 'express';
import getData from './utils/scrape';

export function createAPI(client: Client) {
  const app = express();
  app.use(express.json());
  
  // REST endpoints here  
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.get('/:encounter', async (req,res) => {
    res.send(req.params);
    await getData(req.params.encounter);
  })

  return app;
}