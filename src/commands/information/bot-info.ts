import { SlashCommandBuilder } from "@discordjs/builders"
import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import ExtremeTypes from "../../structures/Client";
import Command from "../../structures/Command";

export default class extends Command{
    constructor() {
        super(comamndData);
    }

    public async run(client: ExtremeTypes, interaction: ChatInputCommandInteraction) {
        const msg = await interaction.channel!.send({ content: "**Получение данных вебсокета**..." });
        const botInfoEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle(`Информация о боте`)
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                {
                    name: '📊 Серверы',
                    value: `> Бот находится ${client.guilds.cache.size} серверах`
                },
                {
                    name: '👥 Пользователи бота',
                    value: `> У бота ${client.users.cache.size} пользователей`
                },
                {
                    name: '⚔ Задержка Discord API:',
                    value: `> ${Math.floor(msg.createdTimestamp - interaction.createdTimestamp)}ms`
                },
                {
                    name: '⏳ Пинг бота',
                    value: `> ${Math.floor(client.ws.ping)}ms`
                },
                {
                    name: '🧨 CPU в использовании',
                    value: `> ${(process.cpuUsage().user / 1024 / 1024).toFixed(2)}%`
                },
                {
                    name: '🛡 RAM в использовании',
                    value: `> ${Math.floor(process.memoryUsage().heapUsed / 1024 / 1024)}%`
                },
                {
                    name: '🛠 Разработчик',
                    value: `> Why not?#2292 (<@1013890219315040326>)`
                }
            )
            .setColor(client.embedColor)


        interaction.reply({ embeds: [botInfoEmbed], ephemeral: true })
        await msg.delete();
    }
}

const comamndData = new SlashCommandBuilder()
    .setName("bot-info")
    .setDescription('Тех. информация о боте');