import { SlashCommandBuilder } from "@discordjs/builders"
import { ChatInputCommandInteraction, EmbedBuilder, GuildMember } from "discord.js";
import ExtremeTypes from "../../structures/Client";
import Command from "../../structures/Command";

export default class extends Command{
    constructor() {
        super(comamndData);
    }

    public async run(client: ExtremeTypes, interaction: ChatInputCommandInteraction) {
        const member: GuildMember | any = interaction.options.getMember('member') || interaction.member;
        
        const userInfoEmbed = new EmbedBuilder()
            .setTitle(`Информация о пользователе ${member.user.username}`)
            .setThumbnail(member.user.displayAvatarURL())
            .addFields(
                {
                    name: '📢 Тэг',
                    value: `> ${member.user.tag}`
                },
                {
                    name: '⛑ ID',
                    value: `> ${member.user.id}`
                },
                {
                    name: '⏳ Бот?',
                    value: `> ${member.user.bot ? "Да" : "Нет"}`
                },
                {
                    "name": "🔑 Серврерный никнейм",
                    "value": `> ${member.displayName ? member?.displayName : 'Отсуствует'}`
                },
                {
                    name: '🏹 Высшая роль',
                    value: `> ${member.roles.highest}`
                },
                {
                    name: '✔ Аккаунт создан',
                    value: `> <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`
                },
                {
                    name: '👥 Зашёл на сервер',
                    value: `> <t:${Math.floor(member.joinedTimestamp! / 1000)}:R>`
                },
                {
                    "name": "🎭 Значки",
                    "value": `> ${member.user.flags?.toArray().length ? member.user.flags?.toArray().join(',') : 'Отсуствуют'}`
                },
                {
                    "name": "🌐 Пользователь в сети",
                    "value": `> ${member.presence?.status == "online" ? "Да" : "Нет"}`
                }
            )
            .setImage(`${member.user.bannerURL() ? member.user.bannerURL() : "https://i.gifer.com/HJy4.gif"}`)
            .setColor(client.embedColor);

        interaction.reply({ embeds: [userInfoEmbed], ephemeral: true });
    }
}

const comamndData = new SlashCommandBuilder()
    .setName("user-info")
    .setDescription('Информация об участнике сервера')
    .addUserOption(option =>
        option
            .setName("member")
            .setDescription("Введите участника сервера")
            .setRequired(false));