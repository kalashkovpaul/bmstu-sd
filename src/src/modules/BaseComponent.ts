import BaseBus from "./Bus/BaseBus";
import { eventBus } from "./Bus/EventBus";

export default class BaseComponent {
    protected bus: BaseBus;

    constructor() {
        this.bus = eventBus;
    }

    setBus(bus: BaseBus) {
        this.bus = bus;
    }
}