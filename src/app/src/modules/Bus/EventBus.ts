import { callback, event } from "@/types";
import BaseBus from "./BaseBus";

export default class EventBus extends BaseBus {

    constructor() {
        super();
    }

    on(event: event, callback: callback) {
        if (this.listeners.get(event))
            this.listeners.get(event)?.add(callback);
        else
            this.listeners.set(event, (new Set<callback>([callback])));
    }

    off(event: string, callback: callback) {
        this.listeners.get(event)?.delete(callback);
    }

    emit(event: string, ...data: any[]) {
        if (!this.listeners.get(event)) {
            return;
        }
        const tmpSet = new Set(this.listeners.get(event));
        tmpSet?.forEach((listener) => listener(...data));
    }
}

export const eventBus = new EventBus();