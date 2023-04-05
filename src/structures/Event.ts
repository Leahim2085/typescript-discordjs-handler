export default abstract class Event {
    name: string;
    once: Boolean;

    constructor(name: string, once: boolean = false) {
        this.name = name;
        this.once = once;
    }

    abstract run(...args: any[]): Promise<any>;
}