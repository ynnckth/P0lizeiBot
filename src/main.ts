import TelegramBot from 'node-telegram-bot-api';
import PolizeiBot from "./PolizeiBot";

require('dotenv').config();

const bot = new PolizeiBot(new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true}));
bot.initialize();

console.log('Application started\nBot initialized and running');