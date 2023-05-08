import { apiConfig, statuses } from "./consts.js";
import 'isomorphic-fetch';
import { hero, statusData, rightsData, skillData, skillNameData, userData, skillToReceive, skillToSend } from "./types.js";
import { getDateFromString, getMonth } from "./utils.js";

export async function getUserFetch(): Promise<userData> {
    const url = `http://${apiConfig.url}:${apiConfig.port}${apiConfig.getUser}`;
    let result: userData = {
        status: 0,
        user: {
            name: "",
            surname: "",
            lastname: "",
            birthdate: {
                day: "",
                month: "",
                year: "",
            },
            phone: "",
            photo: "",
            resume: "",
        }
    }
    try {
        const response = await fetch(url, {
            method: "GET",
            mode: 'no-cors'
        });
        result.status = response.status;
        const json = await response.json();
        result.user.name = json.name;
        result.user.surname = json.surname;
        result.user.lastname = json.lastname;
        result.user.birthdate = getDateFromString(json.birthdate);
        result.user.phone = json.phone;
        result.user.photo = json.photo;
        result.user.resume = json.resume;
        return result;
    } catch (e) {
        console.log(e);
    }
    return result;
}

export async function getSkillsFetch() {
    const url = `http://${apiConfig.url}:${apiConfig.port}${apiConfig.getSkills}`;
    let result: skillNameData = {
        status: 0,
        names: [],
    }
    try {
        const response = await fetch(url, {
            method: "GET",
            mode: 'no-cors'
        });
        result.status = response.status;
        const json = await response.json();
        result.names = json.names;
    } catch (e) {
        console.log(e);
    }
    return result;
}

export async function getSkillFetch(skillName: string) {
    const url = `http://${apiConfig.url}:${apiConfig.port}${apiConfig.getSkill}`;
    let result: skillData = {
        status: 0,
    }
    try {
        const response = await fetch(url, {
            method: "PUT",
            mode: 'no-cors',
            body: JSON.stringify({
                skillName: skillName
            }),
        });
        result.status = response.status;
        if (result.status != statuses.SUCCESS) {
            return result;
        }
        const json = await response.json();
        let skill = json.skill;
        skill.startdate = getDateFromString(json.skill.startdate);
        skill.enddate = getDateFromString(json.skill.enddate);
        result.skill = skill;
    } catch (e) {
        console.log(e);
    }
    return result;
}

export async function sendEvent(actionCode: string) {
    const url = `http://${apiConfig.url}:${apiConfig.port}${apiConfig.onEvent}`;
    let result: skillData = {
        status: 0,
    }
    try {
        const response = await fetch(url, {
            method: "PUT",
            mode: 'no-cors',
            body: JSON.stringify({
                actionCode: actionCode
            }),
        });
        result.status = response.status;
    } catch (e) {
        console.log(e);
    }
    return result;
}

export async function checkRights() {
    const checkRightsUrl = `http://${apiConfig.url}:${apiConfig.port}${apiConfig.checkRights}`;
    let result: rightsData = {
        status: 0,
        isAdmin: false,
    }
    try {
        const response = await fetch(checkRightsUrl, {
            method: "GET",
            mode: 'no-cors',
        });
        result.status = response.status;
        if (response.status != statuses.SUCCESS) {
            return result;
        }
        const json = await response.json();
        result.isAdmin = json;
    } catch (e) {
        console.log(e);
    }
    return result;
}

export async function saveHero(hero: hero) {
    const checkRightsUrl = `http://${apiConfig.url}:${apiConfig.port}${apiConfig.saveHero}`;
    let result: statusData = {
        status: 0,
    }
    try {
        const response = await fetch(checkRightsUrl, {
            method: "POST",
            mode: 'no-cors',
            body: JSON.stringify({
                hero: hero,
            }),
        });
        result.status = response.status;
        if (response.status != statuses.SUCCESS) {
            return result;
        }
    } catch (e) {
        console.log(e);
    }
    return result;
}

export async function createSkillFetch(skillName: string) {
    const checkRightsUrl = `http://${apiConfig.url}:${apiConfig.port}${apiConfig.createSkill}`;
    let result: statusData = {
        status: 0,
    }
    try {
        const response = await fetch(checkRightsUrl, {
            method: "POST",
            mode: 'no-cors',
            body: JSON.stringify({
                skillName: skillName,
            }),
        });
        result.status = response.status;
        if (response.status != statuses.SUCCESS) {
            return result;
        }
    } catch (e) {
        console.log(e);
    }
    return result;
}

export async function deleteSkillFetch(skillName: string) {
    const checkRightsUrl = `http://${apiConfig.url}:${apiConfig.port}${apiConfig.deleteSkill}`;
    let result: statusData = {
        status: 0,
    }
    try {
        const response = await fetch(checkRightsUrl, {
            method: "POST",
            mode: 'no-cors',
            body: JSON.stringify({
                skillName: skillName,
            }),
        });
        result.status = response.status;
        if (response.status != statuses.SUCCESS) {
            return result;
        }
    } catch (e) {
        console.log(e);
    }
    return result;
}

export async function saveSkillFetch(skill: skillToSend) {
    const checkRightsUrl = `http://${apiConfig.url}:${apiConfig.port}${apiConfig.saveSkill}`;
    let result: statusData = {
        status: 0,
    }
    try {
        const response = await fetch(checkRightsUrl, {
            method: "POST",
            mode: 'no-cors',
            body: JSON.stringify({
                skill: skill,
            }),
        });
        result.status = response.status;
        if (response.status != statuses.SUCCESS) {
            return result;
        }
    } catch (e) {
        console.log(e);
    }
    return result;
}
