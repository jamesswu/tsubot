import dotenv from 'dotenv';
dotenv.config();
const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN, DATABASE_URL, XIVSCRAPER_URL } = process.env;

if (!CLIENT_ID || !GUILD_ID || !DISCORD_TOKEN || !DATABASE_URL || !XIVSCRAPER_URL) throw new Error("Missing environment variables");

const config: Record<string, string> = {
  CLIENT_ID,
  GUILD_ID,
  DISCORD_TOKEN,
  DATABASE_URL,
  XIVSCRAPER_URL
}

export default config;