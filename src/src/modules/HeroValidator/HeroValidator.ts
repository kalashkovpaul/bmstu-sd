import { heroValues } from "@/configs/validator.config";
import { hero } from "@/types";
import IHeroValidator from "./IHeroValidator";

export default class HeroValidator implements IHeroValidator {
    checkHero(hero: hero) {
        let check = false;
        if (this.checkHeroName(hero.name) &&
            this.checkHeroSurname(hero.surname) &&
            this.checkHeroLastname(hero.lastname) &&
            this.checkPhoneNumber(hero.phone) &&
            this.checkBirthdate(hero.birthdate) &&
            (!hero.photo || (typeof hero.photo === "string") || this.checkPhoto(hero.photo)) ||
            (!hero.resume || (typeof hero.resume === "string") || this.checkPhoto(hero.resume))) {
                check = true;
            }
        return check;
    }

    checkHeroName(name: string) {
        let check = false;
        if (name.length >= heroValues.name.min &&
            name.length <= heroValues.name.max) {
                check = true;
            }
        return check;
    }

    checkHeroSurname(surname: string) {
        let check = false;
        if (surname.length >= heroValues.surname.min &&
            surname.length <= heroValues.surname.max) {
                check = true;
            }
        return check;
    }

    checkHeroLastname(lastname: string) {
        let check = false;
        if (lastname.length >= heroValues.lastname.min &&
            lastname.length <= heroValues.lastname.max) {
                check = true;
            }
        return check;
    }

    checkBirthdate(date: Date) {
        let check = false;
        if (date < new Date) {
            check = true;
        }
        return check;
    }

    checkPhoneNumber(phone: string) {
        let check = false;
        if (phone.length >= heroValues.phone.min &&
            phone.length <= heroValues.phone.max) {
                check = true;
            }
        return check;
    }

    checkPhoto(photo: File) {
        let check = false;
        if (photo.name.length >= heroValues.photo.min &&
            photo.name.length <= heroValues.photo.max &&
            photo.size <= heroValues.photo.maxSize &&
            photo.type === heroValues.photo.type) {
                check = true;
            }
        return check;
    }

    checkResume(resume: File) {
        let check = false;
        if (resume.name.length >= heroValues.resume.min &&
            resume.name.length <= heroValues.resume.max &&
            resume.size <= heroValues.resume.maxSize &&
            resume.type === heroValues.resume.type) {
                check = true;
            }
        return check;
    }
}