import { db } from "../../db";
import IHeroRepository from "./IHeroRepository";
import { statuses } from "../../consts";
import { convertDateToSQL } from "../../utils/utils";
import * as fs from "fs";
import { setHeroPhotoData, setHeroResumeData } from "../../types";

export default new class HeroRepository implements IHeroRepository {
    async getHero() {
        const result = {
            status: statuses.SERVER_ERROR,
            hero: {
                name: "",
                surname: "",
                lastname: "",
                birthdate: new Date(),
                phone: "",
                photo: "",
                resume: "",
            }
        }
        try {
            const response = await db.one({
                text: 'SELECT name, surname, lastname, birthdate, phone, photo, resume FROM users WHERE user_id = 1'
            });
            result.status = statuses.SUCCESS;
            result.hero = response;
        } catch (e) {
            console.log(e);
        }
        return result;
    };

    async getActionChain() {
        const result = {
            status: statuses.SERVER_ERROR,
            actionChain: "",
        }
        try {
            const response = await db.one({
                text: 'SELECT chain FROM users WHERE user_id=1',
            });
            result.status = statuses.SUCCESS;
            result.actionChain = response.chain;
        } catch (e) {
            console.log(e);
        }
        return result;
    };

    async setHeroName(heroName: string) {
        return await db.none({
            text: 'UPDATE users SET name=$1 WHERE user_id=1',
            values: [heroName]
        }).then(() => {
            return {
                status: statuses.SUCCESS,
            }
        }).catch((e) => {
            return {
                status: statuses.SERVER_ERROR,
            }
        });
    };

    async setHeroSurname(heroSurname: string) {
        return await db.none({
            text: 'UPDATE users SET surname=$1 WHERE user_id=1',
            values: [heroSurname]
        }).then(() => {
            return {
                status: statuses.SUCCESS,
            }
        }).catch((e) => {
            return {
                status: statuses.SERVER_ERROR,
            }
        });
    };

    async setHeroLastname(heroLastname: string) {
        return await db.none({
            text: 'UPDATE users SET lastname=$1 WHERE user_id=1',
            values: [heroLastname]
        }).then(() => {
            return {
                status: statuses.SUCCESS,
            }
        }).catch((e) => {
            return {
                status: statuses.SERVER_ERROR,
            }
        });
    };

    async setHeroBirthdate(birthdate: Date) {
        return await db.none({
            text: 'UPDATE users SET birthdate=$1 WHERE user_id=1',
            values: [convertDateToSQL(birthdate)]
        }).then(() => {
            return {
                status: statuses.SUCCESS,
            }
        }).catch((e) => {
            return {
                status: statuses.SERVER_ERROR,
            }
        });
    };

    async setHeroPhone(phone: string) {
        return await db.none({
            text: 'UPDATE users SET phone=$1 WHERE user_id=1',
            values: [phone]
        }).then(() => {
            return {
                status: statuses.SUCCESS,
            }
        }).catch((e) => {
            return {
                status: statuses.SERVER_ERROR,
            }
        });
    };

    async setHeroPhoto(photo: File) {
        return await new Promise<setHeroPhotoData>((resolve, reject) => {
            photo.text().then((data: string) => {
                fs.writeFile("avatar.png", data, () => {
                    resolve({
                        status: statuses.SUCCESS,
                        imagePath: "avatar.png"
                    });
                });
            });
        });
    };

    async setHeroResume(resume: File) {
        return await new Promise<setHeroResumeData>((resolve, reject) => {
            resume.text().then((data: string) => {
                fs.writeFile("resume.pdf", data, () => {
                    resolve({
                        status: statuses.SUCCESS,
                        filePath: "resume.pdf"
                    });
                });
            });
        });
    };
}