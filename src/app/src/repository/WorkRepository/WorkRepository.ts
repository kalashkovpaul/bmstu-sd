import { db } from "../../db";
import { statuses } from "../../consts";
import IWorkRepository from "./IWorkRepository";
import { createSkillData, deleteSkillData, setSkillCompetenceData, setSkillDescriptionData, setSkillEndDateData, setSkillImageData, setSkillLinkData, setSkillNameData, setSkillStartDateData } from "../../types";
import { convertDateToSQL } from "../../utils/utils";
import * as fs from "fs";
import logger from "../../logger";


export default new class WorkRepository implements IWorkRepository {
    async getWorks() {
        let result: string[] = [];
        try {
            const response = await db.many({
                text: 'SELECT title FROM works',
            });
            return response.map((item) => {
                return item.title;
            });
        } catch (e) {
            logger.error(e);
        }
        return result;
    };

    async getWork(workName: string) {
        const result = {
            status: statuses.SERVER_ERROR,
            work: {
                title: "",
                description: "",
                href: "",
                image: "",
            }
        }
        try {
            const response = await db.one({
                text: 'SELECT * FROM works WHERE title=$1',
                values: [workName]
            });
            result.status = statuses.SUCCESS;
            result.work = response;
        } catch (e) {
            logger.error(e);
        }
        return result;
    };

    async createWork(workName: string) {
        const result = {
            status: statuses.SERVER_ERROR,
            workName: ""
        }
        try {
            await db.none({
                text: `INSERT INTO works (title, description, href, image) VALUES ($1, '', '', '')`,
                values: [workName],
            });
            result.status = statuses.SUCCESS;
            result.workName = workName;
        } catch (e) {
            logger.error(e);
        }
        return result;
    }

    async deleteWork(workName: string) {
        const result = {
            status: statuses.SERVER_ERROR,
        }
        try {
            db.one({
                text: `DELETE FROM works WHERE (works.title=$1)`,
                values: [workName],
            });
            result.status = statuses.SUCCESS;
        } catch (e) {
            logger.error(e);
        }
        return result;
    }

    async setWorkName(workName: string, newWorkName: string) {
        return await db.none({
            text: 'UPDATE works SET title=$2 WHERE title=$1',
            values: [workName, newWorkName]
        }).then(() => {
            return {
                status: statuses.SUCCESS,
                workName: newWorkName
            }
        }).catch((e) => {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
                workName: ""
            }
        });
    }

    async setWorkDescription(workName: string, newDescription: string) {
        return await db.none({
            text: 'UPDATE works SET description=$2 WHERE title=$1',
            values: [workName, newDescription]
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

    async setWorkHref(workName: string, newHref: string) {
        return await db.none({
            text: 'UPDATE works SET href=$2 WHERE title=$1',
            values: [workName, newHref]
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

    async setWorkImage(workName: string, newImage: string) {
        return await db.none({
            text: 'UPDATE works SET image=$2 WHERE title=$1',
            values: [workName, newImage]
        }).then(() => {
            return {
                status: statuses.SUCCESS,
                image: newImage,
            }
        }).catch((e) => {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
                image: ''
            }
        });

    }

};