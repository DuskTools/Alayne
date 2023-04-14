# Blades in the Darkcord

## A Discord bot for rolling blades in the dark dice

## Setup

- clone this repo locally
- run `$ npm install`
- Use the [Discord Developer Portal](https://discord.com/developers/) to create a new Application, then create a bot user with permissions matching `62679886928`.
  - Note the `application id`,
  - create a token, and note its value.
- In the dev portal, Create a new Oauth URL with the previously given perm interger, then visit it to install the bot on your server
- Locally, create a copy of `.env.example` named `.env`, then fill in the values
  - `TOKEN` is the bot token you made above
  - `APP_ID` is the `application_id` from the developer portal
- `$ npm run deploy` will assign the commands to your server.
- `$ npm run start` will kick off the server. So long as this command stays up, The bot is live!

## Usage

- use `/roll n` to roll `n` number of 6-sided dice. Powered by [`randsum`](https://github.com/alxjrvs/randsum)

## Install

`https://discord.com/api/oauth2/authorize?client_id=1026293303584497704&permissions=277025482752&scope=bot`

## Special Thanks

- [Giana](https://twitter.com/_doglizard) for help with the dice images!
