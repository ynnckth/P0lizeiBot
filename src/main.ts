import TelegramBot from 'node-telegram-bot-api';
import PolizeiBot from "./PolizeiBot";
import logger from './config/logger';

require('dotenv').config();

const bot = new PolizeiBot(new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true}));
bot.initialize();

logger.info('Application started\nBot initialized and running');