import { events } from "@/configs/events.config";
import HeroDelivery from "@/delivery/HeroDelivery";
import { eventData } from "@/types";
import BaseComponent from "../BaseComponent";
import IAdministrator from "./IAdministrator";

export default class Administrator extends BaseComponent implements IAdministrator {
    private heroDelivery: HeroDelivery;
    private actionChain: string;
    private currentActionChain: string;

    constructor(heroDelivery: HeroDelivery) {
        super();
        this.heroDelivery = heroDelivery;
        this.actionChain = this.heroDelivery.getActionChain().actionChain;
        this.currentActionChain = "";
    }

    onEvent(event: eventData) {
        this.currentActionChain += event.actionCode;
    }

    checkAction() {
        if (this.currentActionChain === this.actionChain) {
            this.enableOwnership();
        }
    }

    enableOwnership() {
        this.bus.emit(events.ownerUnlocked);
    }
}