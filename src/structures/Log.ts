export function Log({ name, description, type }: log): void {
    const date: Date = new Date();
    const logTime: string = `\x1b[30m\x1b[11m\x1b[1m${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\x1b[0m`;
    return console.log(`${type} ${logTime} ${name} ${description}`);
}

interface log {
    type: string,
    name: string,
    description: string
}