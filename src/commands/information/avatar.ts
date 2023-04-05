import { SlashCommandBuilder } from "@discordjs/builders"
import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import ExtremeTypes from "../../structures/Client";
import Command from "../../structures/Command";

export default class extends Command {
    constructor() {
        super(comamndData);
    }

    public async run(client: ExtremeTypes, interaction: ChatInputCommandInteraction) {
        const member = interaction.options.getUser('member') || interaction.user;

        const embed = new EmbedBuilder()
            .setImage(member.displayAvatarURL({ size: 1024 }))
            .setTitle(`Аватар пользователя **${member.username}**`)
            .setURL(member.displayAvatarURL({ size: 1024 }))
            .setColor(client.embedColor)

        await interaction.reply({ embeds: [embed]})
    }
}

const comamndData = new SlashCommandBuilder()
    .setName("avatar")
    .setDescription('Автар участника сервера')
    .addUserOption(option =>
        option.setName('member')
            .setDescription('Введите участника сервера')
            .setRequired(false));