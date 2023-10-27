import { hexToDecimal } from "discord-embed-colors";
import { Interaction } from "discord.js";

export function Error({interaction, info, editReply}: ErrorProperties) {
  if (editReply) {
    return interaction.editReply(ErrorEmbed(info));
  } else {
    return interaction.reply(ErrorEmbed(info));
  }
}

const ErrorEmbed = (info: string) => {
  return {
    embeds: [
      {
        title: "Ой! Похоже что возникла ошибка...💥",
        description: info,
        color: hexToDecimal("#2f3136"),
      },
    ],
    ephemeral: true,
  };
};


export interface ErrorProperties {
    interaction: Interaction | any;
    info: string;
    editReply: boolean;
}
