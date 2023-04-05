import { Interaction } from "discord.js";
import ExtremeTypes from "src/structures/Client";
import Event from "../../structures/Event";

export default class extends Event {
    constructor() {
        super("interactionCreate", false);
    }

    public async run(client: ExtremeTypes, interaction: Interaction) {
        function handleInteraction(interact: any) {
            if (interact && interact.run) interact.run(client, interaction);
            else {
                defaultHandler(interaction);
            };
        }
        if(interaction.isChatInputCommand()) return handleInteraction(client.commands.get(interaction.commandName));
        else if(interaction.isButton()) return handleInteraction(client.buttons.get(interaction.customId));
        else if(interaction.isSelectMenu()) return handleInteraction(client.selectmenues.get(interaction.customId));
    }
} 

function defaultHandler(interaction: any): any {
    return interaction.reply({
        content: "Простите Леахима, он ещё не сделал эту команду ;<",
        allowedMentions: {
            repliedUser: false
        },
        ephemeral: true
    });
}