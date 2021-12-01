# messenger-bot
Hi 👋 This is the test project to implement Facebook Messenger API. In short you'll be able to interact with a bot in Messenger. You can try the demo here: m.me/birthdaycounterbot

# To run this project in your localhost:
- clone this repository
- set up your database
- set up your .env
- npm i
- npm start
- run *curl -X GET "localhost:1337/webhook?hub.verify_token=<YOUR_VERIFY_TOKEN>&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"* in you terminal to verify the webhook is ok.

# Primary job
What this bot do? It counts how many days until your birthday. On your first interaction, the bot will ask your name and your birthday with specific format. Then you'll get asked if you want to know how many days until your birthday.
- on yes: the bot will inform you
- on no: the bot will say goodbye

This bot is developed with Express server and deployed to DigitalOcean with Nginx. All the conversation you send to the bot will be recorded to the database, so make sure you don't share your private information as this data will be available to public via Rest API. This project use sequelize to interact with MySql database.

## Rest API
- https://messenger-bot.fngadiyo.com/api/messages - to fetch all recorded messages
- https://messenger-bot.fngadiyo.com/api/message?id=1 - to fetch specific message by id
- https://messenger-bot.fngadiyo.com/api/message/delete?id=1 - to delete specific message by id
 
 note: if you already expose your private data to the bot, please use delete method above to remove it from database.

## Complete Stack
- Node.js
- Express
- Sequelize
- MySql
- Lodash
- dotenv
- cors
- superagent

