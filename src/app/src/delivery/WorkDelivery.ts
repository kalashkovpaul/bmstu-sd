import logger from "../logger";
import { statuses } from "../consts";
import IWorkRepository from "../repository/WorkRepository/IWorkRepository";
import { getWorkData } from "../types";

export default class WorkDelivery {
    private workRepository: IWorkRepository;

    constructor(workRepository: IWorkRepository) {
        this.workRepository = workRepository;
    }

    async getWorkNames(): Promise<string[]> {
        try {
            const response = await this.workRepository.getWorks();
            return response;
        } catch (e) {
            logger.error(e);
            return [];
        }
    }

    async getWork(workName: string): Promise<getWorkData> {
        try {
            const response = this.workRepository.getWork(workName);
            return response;
        } catch (e) {
            logger.error(e);
            return {
                status: statuses.NOT_FOUND,
                work: {
                    title: "",
                    description: "",
                    href: "",
                    image: "",
                }
            }
        }
    }

    async createWork(workName: string) {
        try {
            const response = await this.workRepository.createWork(workName);
            return response;
        } catch (e) {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
                workName: ""
            }

        }
    }

    async deleteWork(workName: string) {
        try {
            const response = await this.workRepository.deleteWork(workName);
            return response;
        } catch (e) {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }
        }
    }

    async setWorkName(workName: string, newWorkName: string) {
        try {
            const response = await this.workRepository.setWorkName(workName, newWorkName);
            return response;
        } catch (e) {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
                workName: ""
            }
        }
    }

    async setDescription(workName: string, newDescription: string) {
        try {
            const response = await this.workRepository.setWorkDescription(workName,
                newDescription);
            return response;
        } catch (e) {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }
        }
    }

    async setHref(workName: string, newHref: string) {
        try {
            const response = await this.workRepository.setWorkHref(workName,
                newHref);
            return response;
        } catch (e) {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }
        }
    }

    async setImage(workName: string, newImage: string) {
        try {
            const response = this.workRepository.setWorkImage(workName,
                newImage);
            return response;
        } catch (e) {
            logger.error(e);
            return {
                status: statuses.SERVER_ERROR,
                image: ""
            }

        }
    }
}