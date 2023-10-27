import { hexToDecimal } from "discord-embed-colors";
import { Client, Collection, Interaction, Partials } from "discord.js";
import { readdirSync } from "node:fs";
import * as path from "path";
import Command from "./Command";
import { Logger } from "./Log";
import { ErrorProperties, Error } from "src/utils";

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

  logger = new Logger();

  public handleInteraction(): void {
    let interactions = ["commands"] as const;

    interactions.forEach((type, index) => {
      this.logger.logMain("interactions", "handling started!");
      readdirSync(path.join(`src/${type}`)).forEach((directory: any) => {
        this.logger.logCategory(directory, `${type} category entered into the handling loop!`);

        let interactionFiles = readdirSync(path.join(`src/${type}/${directory}`)).filter((file: string) => file.endsWith(".ts"));

        for (let i = 0; i < interactionFiles.length; i++) {
          const Interaction = require(`../${type}/${directory}/${interactionFiles[i]}`).default;
          const interactionClass = new Interaction(this);

          if (type == "commands") {
            const commandData = interactionClass.data.toJSON();
            this.commands.set(commandData.name, interactionClass);
            this.logger.logSubCategory(commandData.name, "command entered into the collection!");
          } else {
            const interactionType = this[interactions[index]];
            interactionType.set(interactionClass.data.id, interactionClass);
            this.logger.logSubCategory(interactionClass.data.id, `${interactionType}  entered into the collection!`);
          }
        }
      });
    });
  }

  public handleEvents(): void {
    this.logger.logMain("events", "handling started!");

    return readdirSync(path.join("src/events")).forEach((directory: any) => {
      let eventFiles = readdirSync(path.join(`src/events/${directory}`)).filter((file) => file.endsWith(".ts"));

      this.logger.logCategory(directory, "events category entered into the event handling loop!");

      for (let i = 0; i < eventFiles.length; i++) {
        const Event = require(`../events/${directory}/${eventFiles[i]}`).default;
        const eventClass = new Event(this);
        const eventName = eventClass.name;
        const eventOnce = eventClass.once;

        if (eventOnce){
          this.once(eventName, (...args) => eventClass.run(this, ...args));
        }
        else {
          this.on(eventName, (...args) => eventClass.run(this, ...args))
        };
        this.logger.logSubCategory(eventName, "event entered into the event handling loop!");
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
  public error = (properties: ErrorProperties) => { return Error(properties); }
}
