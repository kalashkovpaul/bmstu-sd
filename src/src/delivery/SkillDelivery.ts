import { statuses } from "../consts";
import ISkillRepository from "../repository/SkillRepository/ISkillRepository";
import { getSkillData, setSkillCompetenceData, setSkillDescriptionData, setSkillEndDateData, setSkillImageData, setSkillLinkData, setSkillNameData, setSkillStartDateData, skillNames } from "../types";

export default class SkillDelivery {
    private skillRepository: ISkillRepository;

    constructor(skillRepository: ISkillRepository) {
        this.skillRepository = skillRepository;
    }

    async getSkillNames(): Promise<skillNames> {
        try {
            const response = await this.skillRepository.getSkillNames();
            return response;
        } catch (e) {
            console.log(e);
            return {
                names: []
            }
        }
    }

    async getSkill(skillName: string): Promise<getSkillData> {
        try {
            const response = this.skillRepository.getSkill(skillName);
            return response;
        } catch (e) {
            console.log(e);
            return {
                status: statuses.NOT_FOUND,
                skill: {
                    name: "",
                    description: "",
                    competence: 0,
                    startDate: new Date(),
                    endDate: new Date(),
                    link: ""
                }
            }
        }
    }

    async createSkill(skillName: string) {
        try {
            const response = await this.skillRepository.createSkill(skillName);
            return response;
        } catch (e) {
            console.error(e);
            return {
                status: statuses.SERVER_ERROR,
                skillName: ""
            }

        }
    }

    async deleteSkill(skillName: string) {
        try {
            const response = await this.skillRepository.deleteSkill(skillName);
            return response;
        } catch (e) {
            console.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }
        }
    }

    async setSkillName(skillName: string, newSkillName: string) {
        try {
            const response = await this.skillRepository.setSkillName(skillName, newSkillName);
            return response;
        } catch (e) {
            console.error(e);
            return {
                status: statuses.SERVER_ERROR,
                skillName: ""
            }
        }
    }

    async setDescription(skillName: string, newDescription: string) {
        try {
            const response = await this.skillRepository.setSkillDescription(skillName,
                newDescription);
            return response;
        } catch (e) {
            console.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }
        }
    }

    async setCompetence(skillName: string, newCompetense: number) {
        try {
            const response = await this.skillRepository.setSkillCompetence(skillName,
                newCompetense);
            return response;
        } catch (e) {
            console.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }
        }
    }

    async setStartDate(skillName: string, newStartDate: Date) {
        try {
            const response = await this.skillRepository.setSkillStartDate(skillName,
                newStartDate);
            return response;
        } catch (e) {
            console.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }
        }
    }

    async setEndDate(skillName: string, newEndDate: Date) {
        try {
            const response = await this.skillRepository.setSkillEndDate(skillName,
                newEndDate);
            return response;
        } catch (e) {
            console.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }
        }
    }

    async setLink(skillName: string, newLink: string) {
        try {
            const response = await this.skillRepository.setSkillLink(skillName,
                newLink);
            return response;
        } catch (e) {
            console.error(e);
            return {
                status: statuses.SERVER_ERROR,
            }
        }
    }

    async setImage(skillName: string, newImage: File) {
        try {
            const response = this.skillRepository.setSkillImage(skillName,
                newImage);
            return response;
        } catch (e) {
            console.error(e);
            return {
                status: statuses.SERVER_ERROR,
                imagePath: ""
            }

        }
    }
}