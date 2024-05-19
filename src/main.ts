import TelegramBot from 'node-telegram-bot-api';
import PolizeiBot from "./PolizeiBot";
import logger from './config/logger';

require('dotenv').config();

const BLACKLIST = ["lah", "lor"];

const bot = new PolizeiBot(new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true}));

bot.onGetBlacklist(async (message) => {
    await bot.sendMessage(message.chat.id, `🚫Blacklisted terms: ${BLACKLIST.join(", ")}`);
});

bot.onMessage(async (message) => {
    if (message.text && containsBlacklistedTerm(message.text)) {
        await bot.deleteMessage(message);
    }
});

function containsBlacklistedTerm(messageText: string) {
    return BLACKLIST.some((v) => messageText.toLowerCase().includes(v.toLowerCase()));
}

logger.info('Application started. Bot initialized and running');