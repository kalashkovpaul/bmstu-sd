import { statuses } from "@/consts";
import ISkillRepository from "@/repository/SkillRepository/ISkillRepository";
import { getSkillData, setSkillCompetenceData, setSkillDescriptionData, setSkillEndDateData, setSkillImageData, setSkillLinkData, setSkillNameData, setSkillStartDateData } from "@/types";

export default class SkillDelivery {
    private skillRepository: ISkillRepository;

    constructor(skillRepository: ISkillRepository) {
        this.skillRepository = skillRepository;
    }

    getSkill(skillName: string): getSkillData {
        const response = this.skillRepository.getSkill(skillName);
        let result = {
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
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }

    createSkill(skillName: string) {
        const response = this.skillRepository.createSkill(skillName);
        let result = {
            status: statuses.SERVER_ERROR,
            skillName: ""
        }
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }

    deleteSkill(skillName: string) {
        const response = this.skillRepository.deleteSkill(skillName);
        let result = {
            status: statuses.SERVER_ERROR,
        }
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }

    setSkillName(skillName: string, newSkillName: string): setSkillNameData {
        const response = this.skillRepository.setSkillName(skillName, newSkillName);
        let result = {
            status: statuses.SERVER_ERROR,
            skillName: ""
        }
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }

    setDescription(skillName: string, newDescription: string): setSkillDescriptionData {
        const response = this.skillRepository.setSkillDescription(skillName,
            newDescription);
        let result = {
            status: statuses.SERVER_ERROR,
        }
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }

    setCompetence(skillName: string, newCompetense: number): setSkillCompetenceData {
        const response = this.skillRepository.setSkillCompetence(skillName,
            newCompetense);
        let result = {
            status: statuses.SERVER_ERROR,
        }
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }

    setStartDate(skillName: string, newStartDate: Date): setSkillStartDateData {
        const response = this.skillRepository.setSkillStartDate(skillName,
            newStartDate);
        let result = {
            status: statuses.SERVER_ERROR,
        }
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }

    setEndDate(skillName: string, newEndDate: Date): setSkillEndDateData {
        const response = this.skillRepository.setSkillEndDate(skillName,
            newEndDate);
        let result = {
            status: statuses.SERVER_ERROR,
        }
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }

    setLink(skillName: string, newLink: string): setSkillLinkData {
        const response = this.skillRepository.setSkillLink(skillName,
            newLink);
        let result = {
            status: statuses.SERVER_ERROR,
        }
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }

    setImage(skillName: string, newImage: File): setSkillImageData {
        const response = this.skillRepository.setSkillImage(skillName,
            newImage);
        let result = {
            status: statuses.SERVER_ERROR,
            imagePath: ""
        }
        response.then((response) => {
            result = response;
        })
        .catch((e) => {
            console.error(e);
        });
        return result;
    }
}