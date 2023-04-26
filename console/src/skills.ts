import { createSkillFetch, deleteSkillFetch, getSkillFetch, getSkillsFetch, saveSkillFetch } from "./connection.js";
import { statuses } from "./consts.js";
import * as readline from 'readline-sync';
import { dateToString, getDate, getNotEmptyString, getNumber } from "./utils.js";

export async function getSkillNames() {
    const response = await getSkillsFetch();
    if (response.status !== statuses.SUCCESS) {
        console.log("Что-то пошло не так: ", response.status);
        return;
    }
    console.log("Список умений");
    response.names.map((name, i) => {
        console.log(`${i + 1}) ${name};`)
    });
    console.log();
}

export async function getSkill() {
    const skillName = readline.question("Название умения: ");
    const response = await getSkillFetch(skillName);
    if (response.status !== statuses.SUCCESS || !response.skill) {
        console.log("Что-то пошло не так: ", response.status);
        return;
    }
    const skill = response.skill;
    console.log("Умение / достижение");
    console.log(`${skill.name} - ${skill.description}, ${skill.competence} из 10`);
    console.log(`Начало: ${skill.startdate.day} ${skill.startdate.month} ${skill.startdate.year} г.`);
    console.log(`Окончание: ${skill.enddate.day} ${skill.enddate.month} ${skill.enddate.year} г.`);
    console.log();
}

export async function createSkill() {
    const skillName = readline.question("Название умения: ");
    const response = await createSkillFetch(skillName);
    if (response.status !== statuses.SUCCESS) {
        console.log("Что-то пошло не так: ", response.status);
        return;
    }
    console.log("Создано умение: ", skillName);
}

export async function deleteSkill() {
    const skillName = readline.question("Название умения: ");
    const response = await deleteSkillFetch(skillName);
    if (response.status !== statuses.SUCCESS) {
        console.log("Что-то пошло не так: ", response.status);
        return;
    }
    console.log("Умение удалено!");
}

export async function saveSkill() {
    const name = getNotEmptyString("Введите название умения: ");
    const description = getNotEmptyString("Введите описание: ");
    const competence = getNumber("Введите сложность: ");
    const startdate = dateToString(getDate("Введите дату начала: "));
    const enddate = dateToString(getDate("Введите дату окончания: "));
    const skill = {
        name: name,
        description: description,
        competence: competence,
        startdate: startdate,
        enddate: enddate,
    };
    const response = await saveSkillFetch(skill);
    if (response.status !== statuses.SUCCESS) {
        console.log("Что-то пошло не так: ", response.status);
        return;
    }
    console.log("Данные об умении сохранены!");
}