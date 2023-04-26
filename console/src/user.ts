import { getUserFetch, saveHero } from "./connection.js";
import { statuses } from "./consts.js";
import { dateToString, getDate, getNotEmptyString } from "./utils.js";

export async function getUser() {
    const response = await getUserFetch();
    if (response.status !== statuses.SUCCESS) {
        console.log("Что-то пошло не так: ", response.status);
        return;
    }
    console.log("\nДанные о пользователе");
    const user = response.user;
    console.log(`${user.surname} ${user.name} ${user.lastname}`);
    console.log(`Родился ${user.birthdate.day} ${user.birthdate.month} ${user.birthdate.year} года`);
    console.log(`Номер телефона: ${user.phone}`);
    console.log();
}

export async function saveUser() {
    const name = getNotEmptyString("Введите имя: ");
    const surname = getNotEmptyString("Введите фамилию: ");
    const lastname = getNotEmptyString("Введите отчество: ");
    const date = dateToString(getDate("Введите дату рождения: "));
    const phone = getNotEmptyString("Введите номер телефона: ");
    const user = {
        name: name,
        surname: surname,
        lastname: lastname,
        birthdate: date,
        phone: phone,
    };
    const response = await saveHero(user);
    if (response.status !== statuses.SUCCESS) {
        console.log("Что-то пошло не так: ", response.status);
        return;
    }
    console.log("Данные о пользователе сохранены!");
}