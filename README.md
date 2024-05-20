# P0lizeiBot

Telegram bot that automatically deletes messages containing blacklisted terms.

## Usage
1. Find and add the `P0lizeiBot` to your Telegram group chat (like adding a regular user)
2. Edit the group chat and add `P0lizeiBot` as administrator. This gives the bot access to deleting messages.
3. Test the bot by writing messages containing blacklisted terms. Such messages should be auto-deleted.

To check the blacklist send the following message in the group chat: 
> /blacklist

## Dev Setup
**Prerequisites**
- Node & NPM LTS

Create a `.env` file on the top project folder level with the following content: 
```env
TELEGRAM_TOKEN=<your telegram token>
BLACKLIST=<your comma-separated list of keywords>
```

## Deployment
**Prerequisites**
- Docker
- Telegram bot token (Telegram bot should have been created in advance through BotFather)

**Build and run using Docker**
1. Retrieve the bot's Telegram token through the BotFather
2. Build and run a docker container

```shell
# Build the docker image
$ docker build -t polizeibot .

# Run a container
$ docker run -d \
    --name polizeibot \
    --restart unless-stopped \
    -e TELEGRAM_TOKEN=<YOUR TOKEN> \
    -e BLACKLIST=badword,otherbadword \
    polizeibot
```