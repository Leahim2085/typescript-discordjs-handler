import ExtremeTypes from "./structures/Client";;
import { token } from "./config.json";

const client: ExtremeTypes = new TestBot();

client.handleInteraction();
client.handleEvents();
client.init(token);
