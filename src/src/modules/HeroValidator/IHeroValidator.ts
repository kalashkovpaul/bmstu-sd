import { hero } from "@/types";


export default interface IHeroValidator {
    checkHero(hero: hero): boolean;

    checkHeroName(name: string): boolean;

    checkHeroSurname(surname: string): boolean;

    checkHeroLastname(lastname: string): boolean;

    checkBirthdate(date: Date): boolean;

    checkPhoneNumber(phone: string): boolean;

    checkPhoto(photo: File): boolean;

    checkResume(resume: File): boolean;
}