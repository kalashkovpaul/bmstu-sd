import { EXIT_CHOICE, NO_CHOICE, menu } from "./consts.js";
import { getUser, saveUser } from "./user.js";
import {createSkill, deleteSkill, getSkill, getSkillNames, saveSkill } from './skills.js';
import { printMenu } from "./utils.js";
import * as readline from 'readline-sync';
import { checkIsAdmin, sendAction } from "./administration.js";

let choice = NO_CHOICE;


while (choice != EXIT_CHOICE) {
    printMenu();
    choice = readline.question('Выбор: ');
    if (choice === "1") {
        await getUser();
    } else if (choice === "2") {
        await getSkillNames();
    } else if (choice === "3") {
        await getSkill();
    } else if (choice === "4") {
        await sendAction();
    } else if (choice === "5") {
        await checkIsAdmin();
    } else if (choice === "6") {
        await saveUser();
    } else if (choice === "7") {
        await createSkill();
    } else if (choice === "8") {
        await deleteSkill();
    } else if (choice === "9") {
        await saveSkill();
    } else {
        console.log(menu.wrongOption);
    }
}

console.log(menu.exitMessage);

