export const menu = {
    invitation: "Выберите пункт меню: \n",
    options: [
        "Получить информацию о человеке",
        "Получить список умений",
        "Получить информацию о конкретном умениии",
        "Послать событие авторизации",
        "Проверить наличие прав на изменение",
        "Сохранить новую информацию о человеке",
        "Создать новое умение",
        "Удалить умение",
        "Сохранить новую информацию об умении"
    ],
    wrongOption: "Пожалуйста, введите номер одного из указанных выше пунктов",
    exitOption: "Завершить работу",
    exitMessage: "Спасибо, что пользовались данной программой",
}

export const NO_CHOICE = "-1";
export const EXIT_CHOICE  = "0";

export const apiConfig = {
    port: 8004,
    url: "localhost",
    getUser: `/api/user`,
    onEvent: `/api/event`,
    checkRights: `/api/check`,
    saveHero: `/api/save`,
    getSkills: `/api/skills`,
    getSkill: `/api/skill`,
    createSkill: `/api/skill/create`,
    deleteSkill: `/api/skill/delete`,
    saveSkill: `/api/skill/save`,
}

export const statuses = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    INVALID_ARGS: 422,
    FORBIDDEN: 403,
}