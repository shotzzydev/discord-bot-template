import { CommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('suave'),
    async execute(interaction: CommandInteraction) {
        await interaction.reply("eae");
    }
};