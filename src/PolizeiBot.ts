import TelegramBot from 'node-telegram-bot-api';

/**
 * This bot listens to messages from chats it is part of and deletes any messages that are blacklisted.
 * The bot P0lizeiBot needs to be added to the group and promoted to administrator
 */
class PolizeiBot {
    private readonly blacklistedTerms = ["lah", "lor"];

    constructor(private telegramBot: TelegramBot) {
    }

    initialize() {
        this.telegramBot.onText(/\/blacklist/, async (message) => {
            const chatId = message.chat.id;
            await this.sendMessage(chatId, `🚫Blacklisted terms: ${this.blacklistedTerms.join(", ")}`);
        });

        this.telegramBot.on('message', async (message) => {
            if (message.text && this.blacklistedTerms.some((v) => message.text.includes(v))) {
                try {
                    await this.telegramBot.deleteMessage(message.chat.id, message.message_id);
                    console.log(`Deleted message containing blacklisted key word\nChat id: ${message.chat.id}, message id: ${message.message_id}\nMessage: ${message.text}, user: ${message.from.first_name} ${message.from.last_name}`);
                } catch (e) {
                    console.log(`Failed to delete message (chat id: ${message.chat.id}, message id: ${message.message_id}): ${e}`);
                }
            }
        });
    }

    private async sendMessage(chatId: number, message: string) {
        try {
            await this.telegramBot.sendMessage(chatId, message);
        } catch (e) {
            console.log(`Failed to send message: ${e}`);
        }
    }
}
export default PolizeiBot;