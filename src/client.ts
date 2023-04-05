import ExtremeTypes from "./structures/Client";;
import { token } from "./config.json";

const client: ExtremeTypes = new ExtremeTypes();

client.handleInteraction();
client.handleEvents();
client.init(token);