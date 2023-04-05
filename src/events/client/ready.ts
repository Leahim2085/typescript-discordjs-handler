import { ActivityType } from "discord.js";
import ExtremeTypes from "src/structures/Client";
import Event from "../../structures/Event";
import { Log } from "../../structures/Log";

export default class extends Event {
  constructor() {
    super("ready", true);
  }

  public async run(client: ExtremeTypes) {
    client.user.setActivity({
      name: "похвалу от Леахима:)",
      type: ActivityType.Listening
    });

    Log({
      type: "[\x1b[32mREADY\x1b[0m]",
      name: `${client.user.tag}`,
      description: `is ready. RAM: ${
        process.memoryUsage().heapUsed / 1024 / 1024
      }mb, cpu: ${process.cpuUsage().user / 1024 / 1024}%`,
    });

    const commands: any = [];
    client.commands.each((command: { data: any }) =>
      commands.push(command.data)
    );
    client.application.commands.set(commands);
  }
}
