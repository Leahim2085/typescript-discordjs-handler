import { SlashCommandBuilder } from 'discord.js';

export default abstract class Command {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

    constructor(data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">) {
        this.data = data;
    }

    abstract run(...args: any[]): Promise<any>;
}