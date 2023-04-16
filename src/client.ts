import TestBot from "./structures/Client";;
import { token } from "./config.json";

const client: TestBot = new TestBot();

client.handleInteraction();
client.handleEvents();
client.init(token);
