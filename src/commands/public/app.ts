import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
    .setName('app')
    .setDescription('View all you apllications'),
    async execute(interaction: CommandInteraction) {

        const embed = new EmbedBuilder({
            author: {
                name: "",
                iconURL: ""
            },
            description: "> Desenvolvido por shotzzy",
            fields: [
                { name: "", value: "", }
            ],
            thumbnail: {url: ""},
            image: {url: ""},
            color: 23316831,
        })

        await interaction.reply("eae")
    }
}