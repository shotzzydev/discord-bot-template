import fs from 'node:fs';
import path from 'node:path';
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import ck from "chalk";
import { consola as log } from "consola";
import dotenv from 'dotenv';
dotenv.config();

export const dotenvInfos = {
    token: String(process.env.TOKEN_BOT)
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const folderPath = path.join(__dirname, 'commands');
const commandsFolders = fs.readdirSync(folderPath);

for(const folder of commandsFolders) {
    const commandsPath = path.join(folderPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            log.error(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
        }
    }
}

client.once(Events.ClientReady, readyClient => {
    log.log(`Ready! Logged in as ${ck.underline.blue(`${readyClient.user.tag}`)}`)
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if(!command) {
        log.error(`No command matching ${interaction.commandName} as found`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch(error) {
        log.error(error);

        if(interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: `There was an error while execution this command!`, ephemeral: true });
        } else {
            await interaction.reply({ content: `There was an error white executing this commmand!`, ephemeral: true });
        }
    }


})

client.login(dotenvInfos.token);