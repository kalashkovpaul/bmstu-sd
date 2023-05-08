import { eventData } from "@/types";

export default interface IAdministrator {
    onEvent(event: eventData): void;

    checkAction(): void;

    enableOwnership(): void;

    getHero(): void;
}