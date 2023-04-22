import { skillValues } from "../../configs/validator.config";
import { skill } from "../../types";
import ISkillValidator from "./ISkillValidator";

export default class SkillValidator implements ISkillValidator {

    checkSkill(skill: skill) {
        let check = false;
        if (this.checkSkillName(skill.name) &&
            this.checkDescription(skill.description) &&
            this.checkDateInterval(skill.startDate, skill.endDate) &&
            this.checkLink(skill.link) &&
            (!skill.image || typeof skill.image === "string" || this.checkImage(skill.image as File))) {
                check = true;
            }
        return check;
    }

    checkSkillName(name: string) {
        let check = false;
        if (name.length >= skillValues.name.min &&
            name.length <= skillValues.name.max) {
                check = true;
            }
        return check;
    }

    checkDescription(description: string) {
        let check = false;
        if (description.length >= skillValues.description.min &&
            description.length <= skillValues.description.max) {
                check = true;
            }
        return check;
    }

    checkDate() {
        let check = true;
        return check;
    }

    checkDateInterval(startDate: Date, endDate: Date) {
        let check = false;
        if (startDate < endDate) {
            check = true;
        }
        return check;
    }

    checkLink(link: string) {
        let check = false;
        if (link.length >= skillValues.link.min &&
            link.length <= skillValues.link.max) {
                check = true;
            }
        return check;
    }

    checkImage(image: File) {
        let check = false;
        if (image.name.length >= skillValues.image.min &&
            image.name.length <= skillValues.image.max &&
            image.size <= skillValues.image.maxSize &&
            image.type === skillValues.image.type) {
                check = true;
            }
        return check;
    }
}