import { skill } from "@/types";

export default interface ISkillValidator {
    checkSkill(skill: skill): boolean;

    checkSkillName(name: string): boolean;

    checkDescription(description: string): boolean;

    checkDate(date: Date): boolean;

    checkDateInterval(startDate: Date, endDate: Date): boolean;

    checkLink(link: string): boolean;

    checkImage(image: File): boolean;
}