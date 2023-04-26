import { EXIT_CHOICE, menu } from "./consts.js";
import * as readline from 'readline-sync';

export function printMenu() {
    console.log(menu.invitation);
    menu.options.forEach((option, i) => {
        console.log(`${i + 1}. ${option}`);
    });
    console.log(`\n${EXIT_CHOICE}. ${menu.exitOption}`);
}

export function getMonth(monthString: string) {
    const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря", ];
    let result = "------";
    try {
        const monthNumber = +monthString - 1;
        if (monthNumber >= 1 && monthNumber <= 12) {
            result = months[monthNumber];
        }
    } catch (e) {
        console.error(e);
    }
    return result;
}

export function getDateFromString(datestring: string) {
    return {
        year: datestring.slice(0, 4),
        month: getMonth(datestring.slice(5, 7)),
        day: datestring.slice(8, 10),
    }
}

export function getNotEmptyString(message: string) {
    let str = "";
    while (!str.length) {
        str = readline.question(message);
        if (!str.length) {
            console.log("Непустую строку, пожалуйста");
        }
    }
    return str;
}

export function getNumber(message: string) {
    let str = "";
    const regexp = /^([1-9]|10)/;
    while(!str.match(regexp)) {
        str = readline.question(message);
        if (!str.match(regexp)) {
            console.log("Введите число от 1 до 10");
        }
    };
    return +str;
}

export function getDate(message: string) {
    let str = "";
    const regexp = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    while(!str.match(regexp)) {
        str = readline.question(message);
        if (!str.match(regexp)) {
            console.log("Введите данные в формате ДД-ММ-ГГГГ");
        }
    }
    const dateParts = str.split("-");
    const date = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    return date;
}

export function dateToString(date: Date) {
    console.log(date);
    return date.toISOString().split('T')[0];
}