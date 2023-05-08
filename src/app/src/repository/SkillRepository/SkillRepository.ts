import { db } from "../../db";
import { statuses } from "../../consts";
import ISkillRepository from "./ISkillRepository";
import { createSkillData, deleteSkillData, setSkillCompetenceData, setSkillDescriptionData, setSkillEndDateData, setSkillImageData, setSkillLinkData, setSkillNameData, setSkillStartDateData } from "../../types";
import { convertDateToSQL } from "../../utils/utils";
import * as fs from "fs";
import logger from "../../logger";


export default new class SkillRepository implements ISkillRepository {
    async getSkillNames() {
        let result = {
            names: [],
        }
        try {
            const response = await db.many({
                text: 'SELECT name FROM skills',
            });
            return {
                names: response.map((item) => {
                    return item.name;
                }),
            }
        } catch (e) {
            logger.error(e);
        }
        return result;
    };

    async getSkill(skillName: string) {
        const result = {
            status: statuses.SERVER_ERROR,
            skill: {
                name: "",
                description: "",
                competence: 0,
                startDate: new Date(),
                endDate: new Date(),
                link: "",
                image: "",
            }
        }
        try {
            const response = await db.one({
                text: 'SELECT name, description, competence, startDate, endDate, link, image FROM skills WHERE name=$1',
                values: [skillName]
            });
            result.status = statuses.SUCCESS;
            result.skill = response;
        } catch (e) {
            logger.error(e);
        }
        return result;
    };

    async createSkill(skillName: string): Promise<createSkillData> {
        const result = {
            status: statuses.SERVER_ERROR,
            skillName: ""
        }
        try {
            const response = await db.none({
                text: `INSERT INTO skills (name, description, competence, startDate, endDate, link, image) VALUES ($1, '', 0, '2000-01-01', '2023-01-01', '', $2)`,
                values: [skillName, skillName + '.png'],
            });
            result.status = statuses.SUCCESS;
            result.skillName = skillName;
        } catch (e) {
            logger.error(e);
        }
        return result;
    }

    async deleteSkill(skillName: string): Promise<deleteSkillData> {
        const result = {
            status: statuses.SERVER_ERROR,
        }
        try {
            db.one({
                text: `DELETE FROM skills WHERE (skills.name=$1)`,
                values: [skillName],
            });
            result.status = statuses.SUCCESS;
        } catch (e) {
            logger.error(e);
        }
        return result;
    }

    async setSkillName(skillName: string, newSkillName: string): Promise<setSkillNameData> {
        return await db.none({
            text: 'UPDATE skills SET name=$2 WHERE name=$1',
            values: [skillName, newSkillName]
        }).then(() => {
            return {
                status: statuses.SUCCESS,
                skillName: newSkillName
            }
        }).catch((e) => {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
                skillName: ""
            }
        });
    }

    async setSkillDescription(skillName: string, newDescription: string): Promise<setSkillDescriptionData> {
        return await db.none({
            text: 'UPDATE skills SET description=$2 WHERE name=$1',
            values: [skillName, newDescription]
        }).then(() => {
            return {
                status: statuses.SUCCESS,
            }
        }).catch((e) => {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }
        });
    }

    async setSkillCompetence(skillName: string, newCompetense: number): Promise<setSkillCompetenceData> {
        return await db.none({
            text: 'UPDATE skills SET competence=$2 WHERE name=$1',
            values: [skillName, newCompetense]
        }).then(() => {
            return {
                status: statuses.SUCCESS,
            }
        }).catch((e) => {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }
        });
    }

    async setSkillStartDate(skillName: string, newStartDate: Date): Promise<setSkillStartDateData> {
        return await db.none({
            text: 'UPDATE skills SET startdate=$2 WHERE name=$1',
            values: [skillName, convertDateToSQL(newStartDate)]
        }).then(() => {
            return {
                status: statuses.SUCCESS,
            }
        }).catch((e) => {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }
        });
    }

    async setSkillEndDate(skillName: string, newEndDate: Date): Promise<setSkillEndDateData> {
        return await db.none({
            text: 'UPDATE skills SET enddate=$2 WHERE name=$1',
            values: [skillName, convertDateToSQL(newEndDate)]
        }).then(() => {
            return {
                status: statuses.SUCCESS,
            }
        }).catch((e) => {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }
        });
    }

    async setSkillLink(skillName: string, newLink: string): Promise<setSkillLinkData> {
        return await db.none({
            text: 'UPDATE skills SET link=$2 WHERE name=$1',
            values: [skillName, newLink]
        }).then(() => {
            return {
                status: statuses.SUCCESS,
            }
        }).catch((e) => {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }
        });
    }

    async setSkillImage(skillName: string, newImage: File): Promise<setSkillImageData> {
        await db.none({
            text: 'UPDATE skills SET image=$2 WHERE name=$1',
            values: [skillName, newImage.name]
        })
        return await new Promise<setSkillImageData>((resolve, reject) => {
            newImage.text().then((data: string) => {
                fs.writeFile(newImage.name, data, () => {
                    resolve({
                        status: statuses.SUCCESS,
                        imagePath: newImage.name
                    });
                });
            });
        });
    }

};