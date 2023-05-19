import { events } from "../../configs/events.config";
import HeroDelivery from "../../delivery/HeroDelivery";
import { eventData } from "../../types";
import BaseComponent from "../BaseComponent";
import IAdministrator from "./IAdministrator";

export default class Administrator extends BaseComponent implements IAdministrator {
    private heroDelivery: HeroDelivery;
    private actionChain: string;
    private currentActionChain: string;

    constructor(heroDelivery: HeroDelivery) {
        super();
        this.heroDelivery = heroDelivery;
        this.actionChain = "";
        this.heroDelivery.getActionChain().then((data) => {
            this.actionChain = data.actionChain;
        });
        this.currentActionChain = "";
    }

    onEvent = (event: eventData) => {
        if (event.actionCode === '9') {
            this.currentActionChain = "";
            console.log("CLEAR");
        } else {
            this.currentActionChain += event.actionCode;
            console.log("CODE: ", this.currentActionChain);
        }
    }

    checkAction() {
        if (this.currentActionChain === this.actionChain) {
            this.enableOwnership();
            console.log("ENABLE");
        } else {
            this.bus.emit(events.noRights);
        }
    }

    enableOwnership() {
        this.bus.emit(events.ownerUnlocked);
    }

    getHero() {
        this.heroDelivery.getHero().then((data) => {
            this.bus.emit(events.gotUser, data);
        });
    }
}