import { hexToDecimal } from "discord-embed-colors";
import { Client, Collection, Interaction, Partials } from "discord.js";
import { readdirSync } from "node:fs";
import * as path from "path";
import Command from "./Command";
import { Log } from "./Log";

export default class ExtremeTypes extends Client<true> {
  constructor() {
    super({
      intents: 131071,
      partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.User,
        Partials.GuildMember,
        Partials.ThreadMember,
        Partials.GuildScheduledEvent,
      ],
    });
  }

  public handleInteraction(): void {
    let interactions = ["commands"] as const;

    interactions.forEach((type, index) => {
      Log({
        type: "\x1b[32mINTERACTIONS\x1b[0m",
        name: `${type.replace("s", "")}`,
        description: "handling started!",
      });
      readdirSync(path.join(`src/${type}`)).forEach((directory: any) => {
        Log({
          type: "   [\x1b[36m-\x1b[0m]",
          name: `\x1b[4m${directory.toUpperCase()}\x1b[0m`,
          description: `${type} category entered into the handling loop!`,
        });
        let interactionFiles = readdirSync(
          path.join(`src/${type}/${directory}`)
        ).filter((file: string) => file.endsWith(".ts"));
        for (let i = 0; i < interactionFiles.length; i++) {
          const Interaction =
            require(`../${type}/${directory}/${interactionFiles[i]}`).default;
          const interactionClass = new Interaction(this);
          if (type == "commands") {
            const commandData = interactionClass.data.toJSON();
            this.commands.set(commandData.name, interactionClass);
            Log({
              type: "       [\x1b[36m+\x1b[0m]",
              name: `\x1b[4m${commandData.name
                .toString()
                .toUpperCase()}\x1b[0m`,
              description: "command entered into the collection!",
            });
          } else {
            const interactionType = this[interactions[index]];
            interactionType.set(interactionClass.data.id, interactionClass);
            Log({
              type: "       [\x1b[36m+\x1b[0m]",
              name: `\x1b[4m${interactionClass.data.id.toUpperCase()}\x1b[0m`,
              description: `${interactionType}  entered into the collection!`,
            });
          }
        }
      });
    });
  }

  public handleEvents(): void {
    Log({
      type: "[\x1b[32mEVENTS\x1b[0m]",
      name: ""/*sorry, it`s bed code😢*/,
      description: "handling started!",
    });

    return readdirSync(path.join("src/events")).forEach((directory: any) => {
      let eventFiles = readdirSync(path.join(`src/events/${directory}`)).filter(
        (file) => file.endsWith(".ts")
      );

      Log({
        type: "   [\x1b[36m-\x1b[0m]",
        name: `\x1b[4m${directory.toUpperCase()}\x1b[0m`,
        description: "events category entered into the event handling loop!",
      });
      for (let i = 0; i < eventFiles.length; i++) {
        const Event =
          require(`../events/${directory}/${eventFiles[i]}`).default;
        const eventClass = new Event(this);
        const eventName = eventClass.name;
        const eventOnce = eventClass.once;
        if (eventOnce)
          this.once(eventName, (...args) => eventClass.run(this, ...args));
        else this.on(eventName, (...args) => eventClass.run(this, ...args));
        Log({
          type: "       [\x1b[36m+\x1b[0m]",
          name: `\x1b[4m${eventName.toUpperCase()}\x1b[0m`,
          description: "event entered into the event handling loop!",
        });
      }
    });
  }

  public async init(token: string): Promise<void> {
    await super.login(token);
  }

  public readonly commands: Collection<string, Command> = new Collection();
  public readonly buttons: Collection<string, Command> = new Collection();
  public readonly selectmenues: Collection<string, Command> = new Collection();
  public readonly embedColor: number = hexToDecimal("#2f3136");
  public error: (
    interaction: Interaction | any,
    description: string,
    editReply: boolean
  ) => any = (
    interaction: Interaction | any,
    description: string,
    editReply: boolean
  ) => {
    if (editReply) {
      return interaction.editReply({
        embeds: [
          {
            title: "Ой! Похоже что возникла ошибка...💥",
            description: description,
            color: hexToDecimal("#2f3136"),
          },
        ],
      });
    } else {
      return interaction.reply({
        embeds: [
          {
            title: "Ой! Похоже что возникла ошибка...💥",
            description: description,
            color: hexToDecimal("#2f3136"),
          },
        ],
        ephemeral: true,
      });
    }
  };
}
