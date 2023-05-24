import { workValues } from "../../configs/validator.config";
import { skill, workData } from "../../types";
import IWorkValidator from "./IWorkValidator";

export default class WorkValidator implements IWorkValidator {

    checkWork(work: workData) {
        let check = false;
        if (this.checkWorkName(work.title) &&
            this.checkDescription(work.description) &&
            (!work.href || this.checkHref(work.href)) &&
            (!work.image || this.checkImage(work.image))) {
                check = true;
            }
        return check;
    }

    checkWorkName(name: string) {
        let check = false;
        if (name.length >= workValues.name.min &&
            name.length <= workValues.name.max) {
                check = true;
            }
        return check;
    }

    checkDescription(description: string) {
        let check = false;
        if (description.length >= workValues.description.min &&
            description.length <= workValues.description.max) {
                check = true;
            }
        return check;
    }

    checkHref(href: string) {
        let check = false;
        if (href.length >= workValues.href.min &&
            href.length <= workValues.href.max) {
                check = true;
            }
        return check;
    }

    checkImage(image: string) {
        let check = false;
        if (image.length >= workValues.image.min &&
            image.length <= workValues.image.max) {
                check = true;
            }
        return check;
    }
}