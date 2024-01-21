import { SlashCommandBuilder } from "@discordjs/builders"
import { ChatInputCommandInteraction, EmbedBuilder, ChannelType, GuildMember } from "discord.js";
import ExtremeTypes from "../../structures/Client";
import Command from "../../structures/Command";

export default class extends Command{
    constructor() {
        super(commandData);
    }

    public async run(client: ExtremeTypes, interaction: ChatInputCommandInteraction) {
        const all_members = await interaction.guild!.members.fetch();
        const all_channels = await interaction.guild!.channels.fetch(); 
        const all_roles = await interaction.guild!.roles.fetch(); 
        const all_emojis = await interaction.guild!.emojis.fetch(); 
        const member: GuildMember | any = interaction.member;

        const serverInfoEmbed = new EmbedBuilder()
            .setTitle(`Информация о сервере ${interaction.guild!.name}`)
            .addFields(
                {
                    name: "🎴 ID",
                    value: `> ${interaction.guild!.id}`
                },
                {
                    name: "🏹 Количество участников",
                    value: `> Людей: ${all_members.filter(u => !u.user.bot).size}
                        > Ботов: ${all_members.filter(u => u.user.bot).size}
                        > Всего: ${all_members.size}`
                },
                {
                    name: "🛒 Количество каналов",
                    value: `> Текстовых: ${all_channels.filter(c => c!.type == ChannelType.GuildText).size}
                        > Голосовых: ${all_channels.filter(c => c!.type == ChannelType.GuildVoice).size}
                        > Категорий: ${all_channels.filter(c => c!.type == ChannelType.GuildCategory).size}
                        > Всего: ${all_channels.size}`
                },
                {
                    name: "🎭 Количество ролей на сервере",
                    value: `> ${all_roles.size}`
                },
                {
                    name: "🌊 Создатель",
                    value: `> <@${interaction.guild!.ownerId}>`
                },
                {
                    name: `⏰ Вы присоединились`,
                    value: `> <t:${Math.floor(member!.joinedTimestamp! / 1000)}:R>`
                },
                {
                    name: "🌏 Сервер создан",
                    value: `> <t:${Math.floor(interaction.guild!.createdTimestamp / 1000)}:R>`
                },
                {
                    name: "😎 Количество эмодзи",
                    value: `> ${all_emojis.size}`
                }
            )
            .setThumbnail(interaction.guild!.iconURL())
            .setColor(client.embedColor)
            .setImage(`${interaction.guild?.bannerURL() ? interaction.guild!.bannerURL() : "https://i.gifer.com/HJy4.gif"}`)

        await interaction.reply({ embeds: [serverInfoEmbed], ephemeral: true })
    }
}

const commandData = new SlashCommandBuilder()
    .setName("server-info")
    .setDescription('Информация о сервере (гильдии)');
