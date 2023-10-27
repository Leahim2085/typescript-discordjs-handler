export class Logger {
    private getTime() {
        const date: Date = new Date();
        return `\x1b[30m\x1b[11m\x1b[1m${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\x1b[0m`;
    } 

    public logMain(type: string, info: string) {
        return console.log(`[\x1b[32m${type.toUpperCase()}\x1b[0m] ${this.getTime()} ${info}`)
    }

    public logCategory(name: string, info: string ) {
        return console.log(`[\x1b[36m-\x1b[0m] ${this.getTime()} \x1b[32m${name.toUpperCase()}\x1b[0m ${info}`)
    }

    public logSubCategory(name: string, info: string) {
        return console.log(`    [\x1b[36m+\x1b[0m] ${this.getTime()} \x1b[4m${name.toUpperCase()}\x1b[0m ${info}`)
    }
}
