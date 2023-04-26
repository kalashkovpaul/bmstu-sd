import { checkRights, sendEvent } from "./connection.js";
import { statuses } from "./consts.js";
import * as readline from 'readline-sync';

export async function sendAction() {
    const event = readline.question("Событие: ");
    const response = await sendEvent(event);
    if (response.status !== statuses.SUCCESS) {
        console.log("Что-то пошло не так: ", response.status);
        return;
    }
    console.log("Событие послано: ", event);
}

export async function checkIsAdmin() {
    const response = await checkRights();
    if (response.status !== statuses.SUCCESS) {
        console.log("Что-то пошло не так: ", response.status);
        return;
    }
    const message = response.isAdmin ? "Режим владельца включён" : "Режим владельца выключен";
    console.log(message);
}