import { callback, event } from "@/types";

export default class BaseBus {
    protected listeners: Map<string, Set<callback> | null>;

    constructor() {
        this.listeners = new Map();
    }

    on(event: event, callback: callback) {}

    off(event: string, callback: callback) {}

    emit(event: string, ...data: any[]) {}
}