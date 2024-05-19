import TelegramBot from 'node-telegram-bot-api';
import logger from './config/logger';

/**
 * This bot listens to messages from chats it is part of and deletes any messages that are blacklisted.
 * The bot P0lizeiBot needs to be added to the group and promoted to administrator
 */
class PolizeiBot {

    constructor(private telegramBot: TelegramBot) {}

    onMessage(callback: (message: TelegramBot.Message) => void) {
        this.telegramBot.on('message', async (message) => {
            callback(message);
        });
    }

    onGetBlacklist(callback: (message: TelegramBot.Message) => void) {
        this.telegramBot.onText(/\/blacklist/, async (message) => callback(message));
    }

    async sendMessage(chatId: number, message: string) {
        try {
            await this.telegramBot.sendMessage(chatId, message);
        } catch (e) {
            logger.error(`Failed to send message: ${e}`);
        }
    }

    async deleteMessage(message: TelegramBot.Message) {
        try {
            await this.telegramBot.deleteMessage(message.chat.id, message.message_id);
            logger.info(`Deleted message containing blacklisted term. Chat id: ${message.chat.id}, message id: ${message.message_id}. ${message.from.first_name} ${message.from.last_name}: ${message.text}`);
        } catch (e) {
            logger.error(`Failed to delete message (chat id: ${message.chat.id}, message id: ${message.message_id}): ${e}`);
        }
    }
}
export default PolizeiBot;